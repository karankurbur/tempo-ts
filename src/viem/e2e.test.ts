import { afterEach, beforeEach, describe, expect, test } from 'bun:test'
import { RpcRequest, RpcResponse } from 'ox'
import { tempoLocal } from 'tempo/chains'
import { Instance } from 'tempo/prool'
import { createClient, http, publicActions, walletActions } from 'viem'
import { mnemonicToAccount, privateKeyToAccount } from 'viem/accounts'
import { tempoActions } from './index.js'
import { parseTransaction } from './transaction.js'
import { withRelay } from './transport.js'

const instance = Instance.tempo({ port: 8545 })

beforeEach(() => instance.start())
afterEach(() => instance.stop())

describe.skipIf(!!process.env.CI)('sendTransaction', () => {
  test('default', async () => {
    const client = createClient({
      account: mnemonicToAccount(
        'test test test test test test test test test test test junk',
      ),
      chain: tempoLocal,
      transport: http(),
    })
      .extend(publicActions)
      .extend(walletActions)

    const hash = await client.sendTransaction({
      feeToken: '0x20c0000000000000000000000000000000000000',
      to: '0x0000000000000000000000000000000000000000',
    })
    await client.waitForTransactionReceipt({ hash })

    const {
      blockHash: _,
      blockNumber: __,
      ...transaction
    } = await client.getTransaction({ hash })

    expect(transaction).toMatchInlineSnapshot(`
      {
        "accessList": [],
        "authorizationList": [],
        "chainId": 1337,
        "data": "0x",
        "feePayerSignature": undefined,
        "feeToken": "0x20c0000000000000000000000000000000000000",
        "from": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
        "gas": 21000n,
        "gasPrice": 44n,
        "hash": "0x2dc7455a259871cc354fe83a904a1a003555d5d365a81dd4dc7b1ca42e63f2dc",
        "input": "0x",
        "maxFeePerBlobGas": undefined,
        "maxFeePerGas": 52n,
        "maxPriorityFeePerGas": 0n,
        "nonce": 0,
        "r": "0x17d8f3e7638105d316e004faa8e6b680d6f55e0326bf2f0534a0d83b46b6d3fb",
        "s": "0x4a83f0e41f1f13bbbe0b53e4b57d2fb2d2542927e2331016c55265eb0bf5e80a",
        "to": "0x0000000000000000000000000000000000000000",
        "transactionIndex": 0,
        "type": "feeToken",
        "typeHex": "0x77",
        "v": 28n,
        "value": 0n,
        "yParity": 1,
      }
    `)
  })

  test('with feePayer', async () => {
    const account = privateKeyToAccount(
      // unfunded PK
      '0xecc3fe55647412647e5c6b657c496803b08ef956f927b7a821da298cfbdd9666',
    )
    const feePayer = mnemonicToAccount(
      'test test test test test test test test test test test junk',
    )

    const client = createClient({
      account,
      chain: tempoLocal,
      transport: http(),
    })
      .extend(publicActions)
      .extend(walletActions)

    const hash = await client.sendTransaction({
      feePayer,
      to: '0x0000000000000000000000000000000000000000',
    })
    await client.waitForTransactionReceipt({ hash })

    const {
      blockHash: _,
      blockNumber: __,
      ...transaction
    } = await client.getTransaction({ hash })

    expect(transaction).toMatchInlineSnapshot(`
      {
        "accessList": [],
        "authorizationList": [],
        "chainId": 1337,
        "data": "0x",
        "feePayer": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
        "feePayerSignature": {
          "r": "0xac52dfb87fa6026cc207f19ab21cfdd8b7067ee091458883e32cf64c16e7652e",
          "s": "0x3c2652f81cb51514c339d578daaddbf54a3398f08b3ae8b7a0e094547454a03a",
          "v": 27n,
          "yParity": 0,
        },
        "feeToken": null,
        "from": "0x5b856a229fe0aaa5d96470e600b6f0ee4f8fe0dc",
        "gas": 21000n,
        "gasPrice": 44n,
        "hash": "0x6d083d6e7e0b06bb608cb1ae1c358fe0d88e8cb3d0e9508e1a56a6b328bad52d",
        "input": "0x",
        "maxFeePerBlobGas": undefined,
        "maxFeePerGas": 52n,
        "maxPriorityFeePerGas": 0n,
        "nonce": 0,
        "r": "0x41674b408d809bd8edbccf70b106d96071cff6b9496759a6ee0436678456eff4",
        "s": "0x21aa6b6f528231cb5037ae4e3e09be8e9cf9fd569859ce5039dd93d92f27e217",
        "to": "0x0000000000000000000000000000000000000000",
        "transactionIndex": 0,
        "type": "feeToken",
        "typeHex": "0x77",
        "v": 27n,
        "value": 0n,
        "yParity": 0,
      }
    `)
  })
})

describe.skipIf(!!process.env.CI)('signTransaction', () => {
  test('default', async () => {
    const account = privateKeyToAccount(
      // unfunded PK
      '0xecc3fe55647412647e5c6b657c496803b08ef956f927b7a821da298cfbdd9666',
    )
    const feePayer = mnemonicToAccount(
      'test test test test test test test test test test test junk',
    )

    const client = createClient({
      account,
      chain: tempoLocal,
      transport: http(),
    })
      .extend(walletActions)
      .extend(publicActions)

    const request = await client.prepareTransactionRequest({
      data: '0xdeadbeef',
      to: '0xcafebabecafebabecafebabecafebabecafebabe',
      type: 'feeToken',
    })
    let transaction = await client.signTransaction(request)

    transaction = await client.signTransaction({
      ...parseTransaction(transaction),
      feePayer,
    })
    const hash = await client.sendRawTransaction({
      serializedTransaction: transaction,
    })

    await client.waitForTransactionReceipt({ hash })

    const {
      blockHash: _,
      blockNumber: __,
      ...transaction2
    } = await client.getTransaction({ hash })

    expect(transaction2).toMatchInlineSnapshot(`
      {
        "accessList": [],
        "authorizationList": [],
        "chainId": 1337,
        "data": "0xdeadbeef",
        "feePayer": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
        "feePayerSignature": {
          "r": "0x183cae594588d44b6436a35493246e134f3295e4dcf28ced4c4a209acf3f427d",
          "s": "0x24ae9605dd1c75bd4d157a638df40b1eb15e7a278906370573c971b25c348f97",
          "v": 27n,
          "yParity": 0,
        },
        "feeToken": null,
        "from": "0xa8f1d09053a8e4c72445b032a8aa4228778f118c",
        "gas": 21326n,
        "gasPrice": 44n,
        "hash": "0x7851d0c8c58a229f2ebdeda8805bf98a82f76a56960bcfc692d08c17de056cff",
        "input": "0xdeadbeef",
        "maxFeePerBlobGas": undefined,
        "maxFeePerGas": 52n,
        "maxPriorityFeePerGas": 0n,
        "nonce": 0,
        "r": "0x37dd9c584f676de7cb054c182cab39f5256921c1a2e768e7ba18699b1c93b2d0",
        "s": "0x49ea80aa9fb1f54c9743e63411b5cf3859146e352af239e93ca4d918ec3a6008",
        "to": "0xcafebabecafebabecafebabecafebabecafebabe",
        "transactionIndex": 0,
        "type": "feeToken",
        "typeHex": "0x77",
        "v": 28n,
        "value": 0n,
        "yParity": 1,
      }
    `)
  })
})

describe.skipIf(!!process.env.CI)('relay', () => {
  test('default', async () => {
    const { url } = Bun.serve({
      port: 8546,
      async fetch(req) {
        const client = createClient({
          account: mnemonicToAccount(
            'test test test test test test test test test test test junk',
          ),
          chain: tempoLocal,
          transport: http(),
        }).extend(walletActions)

        const request = RpcRequest.from(await req.json())

        if (request.method !== 'eth_sendRawTransaction')
          return Response.json(
            RpcResponse.from(
              {
                error: new RpcResponse.MethodNotSupportedError({
                  message: 'relay only supports `eth_sendRawTransaction`',
                }),
              },
              { request },
            ),
          )

        const serialized = request.params[0] as `0x77${string}`
        if (!serialized.startsWith('0x77'))
          return Response.json(
            RpcResponse.from(
              {
                error: new RpcResponse.InvalidParamsError({
                  message: 'relay only supports `0x77` transactions',
                }),
              },
              { request },
            ),
          )

        const transaction = parseTransaction(serialized)
        const serializedTransaction = await client.signTransaction({
          ...transaction,
          feePayer: client.account,
        })
        const hash = await client.sendRawTransaction({
          serializedTransaction,
        })

        return Response.json(RpcResponse.from({ result: hash }, { request }))
      },
    })

    const client = createClient({
      account: privateKeyToAccount(
        // unfunded PK
        '0xecc3fe55647412647e5c6b657c496803b08ef956f927b7a821da298cfbdd9666',
      ),
      chain: tempoLocal,
      transport: withRelay(http(), http(url.toString())),
    })
      .extend(tempoActions())
      .extend(walletActions)
      .extend(publicActions)

    const hash = await client.fee.setUserToken({
      token: 1n,
    })
    await client.waitForTransactionReceipt({ hash })

    const {
      blockHash: _,
      blockNumber: __,
      ...transaction
    } = await client.getTransaction({ hash })

    expect(transaction).toMatchInlineSnapshot(`
      {
        "accessList": [],
        "authorizationList": [],
        "chainId": 1337,
        "data": "0xe789744400000000000000000000000020c0000000000000000000000000000000000001",
        "feePayer": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
        "feePayerSignature": {
          "r": "0xcc7cb7625e176ed4cd8c4f7f0fe0179d651ff81f9b2e0aadcf76a384629a343c",
          "s": "0x1f216b194605f37b8dd0f8c3c408ca56b5d775401da5af2e8368f847dea7fcdf",
          "v": 27n,
          "yParity": 0,
        },
        "feeToken": null,
        "from": "0x697c9fad5a9824020c01ed7ef2519f3dcc22a5d8",
        "gas": 22563n,
        "gasPrice": 44n,
        "hash": "0x5a49ad5c4efacca483d7f4f76f08d7ed9828a71dcb5ecae52c10df094d944f85",
        "input": "0xe789744400000000000000000000000020c0000000000000000000000000000000000001",
        "maxFeePerBlobGas": undefined,
        "maxFeePerGas": 52n,
        "maxPriorityFeePerGas": 0n,
        "nonce": 0,
        "r": "0x53e6d3139943b876dace108c6da435ae62b4f6bfee859ba42355d3c309241a19",
        "s": "0x7da02ee7c649bfec235f87793ede9579da6dc23d0f411e1a5977762bcbaae987",
        "to": "0xfeec000000000000000000000000000000000000",
        "transactionIndex": 0,
        "type": "feeToken",
        "typeHex": "0x77",
        "v": 28n,
        "value": 0n,
        "yParity": 1,
      }
    `)
  })
})
