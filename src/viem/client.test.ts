import { expect, test } from 'bun:test'
import { createTempoClient } from './client.js'

test('createTempoClient', () => {
  const client = createTempoClient()
  expect(client).toMatchInlineSnapshot(`
    {
      "account": undefined,
      "amm": {
        "burn": [Function],
        "getLiquidityBalance": [Function],
        "getPool": [Function],
        "getPoolId": [Function],
        "getTotalSupply": [Function],
        "mint": [Function],
        "rebalanceSwap": [Function],
        "watchBurn": [Function],
        "watchFeeSwap": [Function],
        "watchMint": [Function],
        "watchRebalanceSwap": [Function],
      },
      "batch": undefined,
      "cacheTime": 500,
      "ccipRead": undefined,
      "chain": {
        "blockTime": 1000,
        "contracts": {
          "multicall3": {
            "address": "0xca11bde05977b3631167028862be2a173976ca11",
            "blockCreated": 0,
          },
        },
        "fees": undefined,
        "formatters": {
          "transaction": {
            "exclude": undefined,
            "format": [Function],
            "type": "transaction",
          },
          "transactionRequest": {
            "exclude": undefined,
            "format": [Function],
            "type": "transactionRequest",
          },
        },
        "id": 42424,
        "name": "Tempo",
        "nativeCurrency": {
          "decimals": 18,
          "name": "USD",
          "symbol": "USD",
        },
        "rpcUrls": {
          "default": {
            "http": [
              "http://localhost:8545",
            ],
          },
        },
        "serializers": {
          "transaction": [Function: serializeTransaction],
        },
      },
      "extend": [Function],
      "fee": {
        "getUserToken": [Function],
        "setUserToken": [Function],
        "watchSetUserToken": [Function],
      },
      "key": "base",
      "name": "Base Client",
      "pollingInterval": 500,
      "request": [Function: AsyncFunction],
      "token": {
        "approve": [Function],
        "burn": [Function],
        "burnBlocked": [Function],
        "changeTransferPolicy": [Function],
        "create": [Function],
        "getAllowance": [Function],
        "getBalance": [Function],
        "getMetadata": [Function],
        "grantRoles": [Function],
        "mint": [Function],
        "pause": [Function],
        "permit": [Function],
        "renounceRoles": [Function],
        "revokeRoles": [Function],
        "setRoleAdmin": [Function],
        "setSupplyCap": [Function],
        "transfer": [Function],
        "unpause": [Function],
        "watchAdminRole": [Function],
        "watchApprove": [Function],
        "watchBurn": [Function],
        "watchCreate": [Function],
        "watchMint": [Function],
        "watchRole": [Function],
        "watchTransfer": [Function],
      },
      "transport": {
        "fetchOptions": undefined,
        "key": "http",
        "methods": undefined,
        "name": "HTTP JSON-RPC",
        "request": [Function: AsyncFunction],
        "retryCount": 3,
        "retryDelay": 150,
        "timeout": 10000,
        "type": "http",
        "url": "http://localhost:8545",
      },
      "type": "base",
      "uid": "27cc083316b",
    }
  `)
})
