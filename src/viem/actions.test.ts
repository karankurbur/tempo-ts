import { afterEach, beforeEach, describe, expect, test } from 'bun:test'
import { setTimeout } from 'node:timers/promises'
import { Hex } from 'ox'
import { tempoLocal } from 'tempo/chains'
import { Instance } from 'tempo/prool'
import * as actions from 'tempo/viem/actions'
import { createClient, http, parseEther, publicActions } from 'viem'
import { mnemonicToAccount } from 'viem/accounts'
import { getCode, writeContract } from 'viem/actions'
import { tip20Abi } from './abis.js'
import { usdAddress, usdId } from './addresses.js'

const instance = Instance.tempo({ port: 8545 })

beforeEach(() => instance.start())
afterEach(() => instance.stop())

const account = mnemonicToAccount(
  'test test test test test test test test test test test junk',
)
const account2 = mnemonicToAccount(
  'test test test test test test test test test test test junk',
  { accountIndex: 1 },
)
const account3 = mnemonicToAccount(
  'test test test test test test test test test test test junk',
  { accountIndex: 2 },
)

const client = createClient({
  account,
  chain: tempoLocal,
  transport: http(),
}).extend(publicActions)

describe.skipIf(!!process.env.CI)('createToken', () => {
  test('default', async () => {
    const { hash, ...result } = await actions.createToken(client, {
      currency: 'USD',
      name: 'Test USD',
      symbol: 'TUSD',
    })

    expect(result).toMatchInlineSnapshot(`
        {
          "address": "0x20c0000000000000000000000000000000000001",
          "admin": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "id": 1n,
        }
      `)
    expect(hash).toBeDefined()

    await setTimeout(100)

    const code = await getCode(client, {
      address: result.address,
    })
    expect(code).toBe('0xef')
  })
})

describe.skipIf(!!process.env.CI)('getTokenAllowance', () => {
  test('default', async () => {
    // First, approve some allowance
    await writeContract(client, {
      abi: tip20Abi,
      address: usdAddress,
      functionName: 'approve',
      args: [account2.address, parseEther('50')],
    })
    await setTimeout(100)

    {
      // Test with default token
      const allowance = await actions.getTokenAllowance(client, {
        spender: account2.address,
      })
      expect(allowance).toBe(parseEther('50'))
    }

    {
      // Test with token address
      const allowance = await actions.getTokenAllowance(client, {
        token: usdAddress,
        spender: account2.address,
      })

      expect(allowance).toBe(parseEther('50'))
    }

    {
      // Test with token ID
      const allowance = await actions.getTokenAllowance(client, {
        token: usdId,
        spender: account2.address,
      })

      expect(allowance).toBe(parseEther('50'))
    }
  })
})

describe.skipIf(!!process.env.CI)('getTokenBalance', () => {
  test('default', async () => {
    {
      // Test with default token
      const balance = await actions.getTokenBalance(client)
      expect(balance).toBeGreaterThan(0n)
    }

    {
      // Test with token address
      const balance = await actions.getTokenBalance(client, {
        token: usdAddress,
      })

      expect(balance).toBeGreaterThan(0n)
    }

    {
      // Test with token ID & different account
      const balance = await actions.getTokenBalance(client, {
        token: usdId,
        account: Hex.random(20),
      })

      expect(balance).toBe(0n)
    }
  })
})

describe.skipIf(!!process.env.CI)('getTokenMetadata', () => {
  test('default', async () => {
    const metadata = await actions.getTokenMetadata(client)

    expect(metadata).toMatchInlineSnapshot(`
      {
        "currency": "USD",
        "decimals": 6,
        "name": "TestUSD",
        "paused": false,
        "supplyCap": 115792089237316195423570985008687907853269984665640564039457584007913129639935n,
        "symbol": "TestUSD",
        "totalSupply": 340282366920938463647842048168863727605n,
        "transferPolicy": "always-allow",
      }
    `)
  })

  test('behavior: custom token (address)', async () => {
    const { address } = await actions.createToken(client, {
      currency: 'USD',
      name: 'Test USD',
      symbol: 'TUSD',
    })

    await setTimeout(100)

    const metadata = await actions.getTokenMetadata(client, {
      token: address,
    })

    expect(metadata).toMatchInlineSnapshot(`
      {
        "currency": "USD",
        "decimals": 6,
        "name": "Test USD",
        "paused": false,
        "supplyCap": 115792089237316195423570985008687907853269984665640564039457584007913129639935n,
        "symbol": "TUSD",
        "totalSupply": 0n,
        "transferPolicy": "always-allow",
      }
    `)
  })

  test('behavior: custom token (id)', async () => {
    const token = await actions.createToken(client, {
      currency: 'USD',
      name: 'Test USD',
      symbol: 'TUSD',
    })

    await setTimeout(100)

    const metadata = await actions.getTokenMetadata(client, {
      token: token.id,
    })

    expect(metadata).toMatchInlineSnapshot(`
      {
        "currency": "USD",
        "decimals": 6,
        "name": "Test USD",
        "paused": false,
        "supplyCap": 115792089237316195423570985008687907853269984665640564039457584007913129639935n,
        "symbol": "TUSD",
        "totalSupply": 0n,
        "transferPolicy": "always-allow",
      }
    `)
  })
})

describe.skipIf(!!process.env.CI)('getUserToken', () => {
  test('default', async () => {
    // Fund accounts
    await writeContract(client, {
      abi: tip20Abi,
      address: usdAddress,
      functionName: 'transfer',
      args: [account2.address, parseEther('100')],
    })
    await writeContract(client, {
      abi: tip20Abi,
      address: usdAddress,
      functionName: 'transfer',
      args: [account3.address, parseEther('100')],
    })
    await setTimeout(100)

    // Set token (address)
    await actions.setUserToken(client, {
      account: account2,
      token: '0x20c0000000000000000000000000000000000001',
    })
    await setTimeout(100)

    // Set another token (id)
    await actions.setUserToken(client, {
      account: account3,
      token: 2n,
    })
    await setTimeout(100)

    // Assert that account (with default) & account2 (with custom) tokens are set correctly.
    expect(
      await actions.getUserToken(client, { account }),
    ).toMatchInlineSnapshot(`
      {
        "address": "0x20C0000000000000000000000000000000000000",
        "id": 0n,
      }
    `)
    expect(
      await actions.getUserToken(client, { account: account2 }),
    ).toMatchInlineSnapshot(`
      {
        "address": "0x20C0000000000000000000000000000000000001",
        "id": 1n,
      }
    `)
    expect(
      await actions.getUserToken(client, { account: account3 }),
    ).toMatchInlineSnapshot(`
      {
        "address": "0x20C0000000000000000000000000000000000002",
        "id": 2n,
      }
    `)
  })
})

describe.skipIf(!!process.env.CI)('setUserToken', () => {
  test('default', async () => {
    expect(await actions.getUserToken(client)).toMatchInlineSnapshot(
      `
        {
          "address": "0x20C0000000000000000000000000000000000000",
          "id": 0n,
        }
      `,
    )

    {
      const hash = await actions.setUserToken(client, {
        token: '0x20c0000000000000000000000000000000000001',
      })
      expect(hash).toBeDefined()
    }

    await setTimeout(10)

    expect(await actions.getUserToken(client, {})).toMatchInlineSnapshot(
      `
        {
          "address": "0x20C0000000000000000000000000000000000001",
          "id": 1n,
        }
      `,
    )

    {
      const hash = await actions.setUserToken(client, {
        feeToken: 0n,
        token: 0n,
      })
      expect(hash).toBeDefined()
    }

    await setTimeout(10)

    expect(await actions.getUserToken(client, {})).toMatchInlineSnapshot(
      `
        {
          "address": "0x20C0000000000000000000000000000000000000",
          "id": 0n,
        }
      `,
    )
  })
})

describe.skipIf(!!process.env.CI)('grantTokenRole', () => {
  test('default', async () => {
    // Create a new token where we're the admin
    const { address } = await actions.createToken(client, {
      admin: client.account,
      currency: 'USD',
      name: 'Test Token',
      symbol: 'TEST',
    })

    await setTimeout(100)

    // Grant issuer role to account2
    const grantHash = await actions.grantTokenRole(client, {
      token: address,
      role: 'issuer',
      to: account2.address,
    })

    await setTimeout(100)

    const grantReceipt = await client.getTransactionReceipt({ hash: grantHash })

    expect(grantReceipt.status).toBe('success')
  })
})

describe.skipIf(!!process.env.CI)('revokeTokenRole', async () => {
  test('default', async () => {
    const { address } = await actions.createToken(client, {
      admin: client.account,
      currency: 'USD',
      name: 'Test Token 2',
      symbol: 'TEST2',
    })

    await setTimeout(100)

    await actions.grantTokenRole(client, {
      token: address,
      role: 'issuer',
      to: account2.address,
    })

    await setTimeout(100)

    const revokeHash = await actions.revokeTokenRole(client, {
      token: address,
      role: 'issuer',
      from: account2.address,
    })

    expect(revokeHash).toBeDefined()

    await setTimeout(100)

    const revokeReceipt = await client.getTransactionReceipt({
      hash: revokeHash,
    })
    expect(revokeReceipt.status).toBe('success')
  })
})

// TODO: fix
describe.skip('renounceTokenRole', async () => {
  test('default', async () => {
    const { address } = await actions.createToken(client, {
      admin: client.account,
      currency: 'USD',
      name: 'Test Token 3',
      symbol: 'TEST3',
    })

    await setTimeout(100)

    await actions.grantTokenRole(client, {
      token: address,
      role: 'issuer',
      to: client.account.address,
    })

    await setTimeout(100)

    const renounceHash = await actions.renounceTokenRole(client, {
      token: address,
      role: 'issuer',
    })

    expect(renounceHash).toBeDefined()

    await setTimeout(100)

    const renounceReceipt = await client.getTransactionReceipt({
      hash: renounceHash,
    })
    expect(renounceReceipt.status).toBe('success')
  })
})

describe.skipIf(!!process.env.CI)('decorator', () => {
  const client2 = createClient({
    chain: tempoLocal,
    transport: http(),
  }).extend(actions.decorator())

  test('default', async () => {
    expect(Object.keys(client2)).toMatchInlineSnapshot(`
      [
        "account",
        "batch",
        "cacheTime",
        "ccipRead",
        "chain",
        "key",
        "name",
        "pollingInterval",
        "request",
        "transport",
        "type",
        "uid",
        "extend",
        "createToken",
        "getTokenAllowance",
        "getTokenBalance",
        "getTokenMetadata",
        "getUserToken",
        "grantTokenRole",
        "renounceTokenRole",
        "revokeTokenRole",
        "setUserToken",
      ]
    `)
  })
})
