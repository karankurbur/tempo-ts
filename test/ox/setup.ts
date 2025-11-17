import { beforeAll } from 'vitest'
import { Actions } from '../../src/viem/index.js'
import { rpcEnv } from '../config.js'
import { accounts, client } from '../viem/config.js'

beforeAll(async () => {
  if (rpcEnv === 'local') return
  await Actions.faucet.fundSync(client, {
    account: accounts[0].address,
  })
})
