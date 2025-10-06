import type * as Calls from 'ox/erc7821/Calls';
import * as Hex from 'ox/Hex';
import { type AccessList, type Account, type Address, type AuthorizationList, type FeeValuesEIP1559, type ParseTransactionReturnType, type SignedAuthorizationList, type TransactionBase, type TransactionRequestBase, type TransactionSerializableBase, type TransactionSerializedGeneric, type RpcTransaction as viem_RpcTransaction, type RpcTransactionRequest as viem_RpcTransactionRequest, type Signature as viem_Signature, type Transaction as viem_Transaction, type TransactionRequest as viem_TransactionRequest, type TransactionSerializable as viem_TransactionSerializable, type TransactionSerialized as viem_TransactionSerialized, type TransactionType as viem_TransactionType } from 'viem';
import type { ExactPartial, OneOf } from "../internal/types.js";
export type Transaction<bigintType = bigint, numberType = number, pending extends boolean = false> = OneOf<viem_Transaction<bigintType, numberType, pending> | TransactionFeeToken<bigintType, numberType, pending>>;
export type TransactionRpc<pending extends boolean = false> = OneOf<viem_RpcTransaction<pending> | TransactionFeeToken<Hex.Hex, Hex.Hex, pending, '0x77'>>;
export type TransactionFeeToken<quantity = bigint, index = number, isPending extends boolean = boolean, type = 'feeToken'> = TransactionBase<quantity, index, isPending> & {
    /** EIP-2930 Access List. */
    accessList: AccessList;
    /** Authorization list for the transaction. */
    authorizationList: SignedAuthorizationList;
    /** Chain ID that this transaction is valid on. */
    chainId: index;
    /** Fee token preference. */
    feeToken?: Address | undefined;
    /** Fee payer address. */
    feePayer?: Address | undefined;
    /** Fee payer signature. */
    feePayerSignature?: viem_Signature | undefined;
    type: type;
} & FeeValuesEIP1559<quantity>;
export type TransactionRequest<bigintType = bigint, numberType = number> = OneOf<viem_TransactionRequest<bigintType, numberType> | TransactionRequestFeeToken<bigintType, numberType>>;
export type TransactionRequestRpc = OneOf<viem_RpcTransactionRequest | TransactionRequestFeeToken<Hex.Hex, Hex.Hex, '0x77'>>;
export type TransactionRequestFeeToken<quantity = bigint, index = number, type = 'feeToken'> = TransactionRequestBase<quantity, index, type> & ExactPartial<FeeValuesEIP1559<quantity>> & {
    accessList?: AccessList | undefined;
    authorizationList?: AuthorizationList<index, boolean> | undefined;
    calls?: readonly Calls.Call[] | undefined;
    feePayer?: Account | true | undefined;
    feeToken?: Address | bigint | undefined;
};
export type TransactionSerializable = OneOf<viem_TransactionSerializable | TransactionSerializableFeeToken>;
export type TransactionSerializableFeeToken<quantity = bigint, index = number> = TransactionSerializableBase<quantity, index> & ExactPartial<FeeValuesEIP1559<quantity>> & {
    accessList?: AccessList | undefined;
    authorizationList: SignedAuthorizationList;
    feeToken?: Address | bigint | undefined;
    feePayerSignature?: viem_Signature | undefined;
    chainId: number;
    type?: 'feeToken' | undefined;
    yParity?: number | undefined;
};
export type TransactionSerialized<type extends TransactionType = TransactionType> = viem_TransactionSerialized<type> | TransactionSerializedFeeToken;
export type TransactionSerializedFeeToken = `0x77${string}`;
export type TransactionType = viem_TransactionType | 'feeToken';
export declare function isTempoTransaction(transaction: Record<string, unknown>): boolean;
export declare function parseTransaction<const serialized extends TransactionSerializedGeneric>(serializedTransaction: serialized): parseTransaction.ReturnType<serialized>;
export declare namespace parseTransaction {
    type ReturnType<serialized extends TransactionSerializedGeneric = TransactionSerializedGeneric> = serialized extends TransactionSerializedFeeToken ? TransactionSerializableFeeToken : ParseTransactionReturnType<serialized>;
}
export declare function serializeTransaction(transaction: TransactionSerializable & {
    calls?: readonly Calls.Call[] | undefined;
    feePayer?: Account | true | undefined;
    from?: Address | undefined;
}, signature?: viem_Signature | undefined): Promise<`0x${string}`>;
//# sourceMappingURL=transaction.d.ts.map