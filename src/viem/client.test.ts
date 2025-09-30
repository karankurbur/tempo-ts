import { expect, test } from 'bun:test'
import { createTempoClient } from './client.js'

test('createTempoClient', () => {
  const client = createTempoClient()
  expect(client).toMatchInlineSnapshot(`
    {
      "account": undefined,
      "approveToken": [Function],
      "batch": undefined,
      "burnBlockedToken": [Function],
      "burnToken": [Function],
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
      "changeTokenTransferPolicy": [Function],
      "createToken": [Function],
      "extend": [Function],
      "getTokenAllowance": [Function],
      "getTokenBalance": [Function],
      "getTokenMetadata": [Function],
      "getUserToken": [Function],
      "grantTokenRoles": [Function],
      "key": "base",
      "mintToken": [Function],
      "name": "Base Client",
      "pauseToken": [Function],
      "permitToken": [Function],
      "pollingInterval": 500,
      "renounceTokenRoles": [Function],
      "request": [Function: AsyncFunction],
      "revokeTokenRoles": [Function],
      "setTokenRoleAdmin": [Function],
      "setTokenSupplyCap": [Function],
      "setUserToken": [Function],
      "transferToken": [Function],
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
      "uid": "b43b1ce0506",
      "unpauseToken": [Function],
      "watchApproveToken": [Function],
      "watchBurnToken": [Function],
      "watchCreateToken": [Function],
      "watchMintToken": [Function],
      "watchSetUserToken": [Function],
      "watchTokenRole": [Function],
      "watchTransferToken": [Function],
    }
  `)
})
