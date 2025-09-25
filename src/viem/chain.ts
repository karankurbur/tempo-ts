import {
  type Chain,
  type ChainConfig,
  defineTransaction,
  defineTransactionRequest,
  type OneOf,
  type Signature,
  serializeTransaction,
  type TransactionSerializable,
} from 'viem'
import * as Transaction from '../ox/Transaction.js'
import * as TxFeeToken from '../ox/TransactionEnvelopeFeeToken.js'
import * as TransactionRequest from '../ox/TransactionRequest.js'

export const config = {
  blockTime: 1_000,
  formatters: {
    transaction: defineTransaction({ format: Transaction.fromRpc }),
    transactionRequest: defineTransactionRequest({
      format: TransactionRequest.toRpc,
    }),
  },
  serializers: {
    transaction(
      transaction: OneOf<
        TxFeeToken.TransactionEnvelopeFeeToken | TransactionSerializable
      >,
      signature?: Signature | undefined,
    ) {
      if (transaction.type === 'feeToken' || transaction.feeToken)
        return TxFeeToken.serialize(transaction, {
          signature: signature as never,
        })
      return serializeTransaction(transaction, signature)
    },
  },
} satisfies Pick<Chain, 'blockTime'> & ChainConfig
