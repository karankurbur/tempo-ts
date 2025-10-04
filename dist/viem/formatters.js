import * as Hex from 'ox/Hex';
import { formatTransaction as viem_formatTransaction, formatTransactionRequest as viem_formatTransactionRequest, } from 'viem';
import { parseAccount } from 'viem/accounts';
import * as ox_Transaction from "../ox/Transaction.js";
import * as ox_TransactionRequest from "../ox/TransactionRequest.js";
import { isTempoTransaction, } from "./transaction.js";
export const formatTransaction = (transaction) => {
    if (!isTempoTransaction(transaction))
        return viem_formatTransaction(transaction);
    const { feePayerSignature, gasPrice: _, nonce, ...tx } = ox_Transaction.fromRpc(transaction);
    return {
        ...tx,
        accessList: tx.accessList,
        authorizationList: tx.authorizationList.map((auth) => ({
            ...auth,
            nonce: Number(auth.nonce),
            r: Hex.fromNumber(auth.r, { size: 32 }),
            s: Hex.fromNumber(auth.s, { size: 32 }),
        })),
        feePayerSignature: feePayerSignature
            ? {
                r: Hex.fromNumber(feePayerSignature.r, { size: 32 }),
                s: Hex.fromNumber(feePayerSignature.s, { size: 32 }),
                v: BigInt(feePayerSignature.v ?? 27),
                yParity: feePayerSignature.yParity,
            }
            : undefined,
        nonce: Number(nonce),
        typeHex: ox_Transaction.toRpcType[tx.type],
        type: tx.type,
        r: Hex.fromNumber(tx.r, { size: 32 }),
        s: Hex.fromNumber(tx.s, { size: 32 }),
        v: BigInt(tx.v ?? 27),
    };
};
export const formatTransactionRequest = (r, action) => {
    const request = r;
    if (!isTempoTransaction(request))
        return viem_formatTransactionRequest(r, action);
    const rpc = ox_TransactionRequest.toRpc({
        ...request,
        authorizationList: request.authorizationList?.map((auth) => ({
            ...auth,
            nonce: BigInt(auth.nonce),
            r: BigInt(auth.r),
            s: BigInt(auth.s),
            yParity: Number(auth.yParity),
        })),
        nonce: request.nonce ? BigInt(request.nonce) : undefined,
        type: 'feeToken',
    });
    return {
        ...rpc,
        ...(request.feePayer
            ? {
                feePayer: typeof request.feePayer === 'object'
                    ? parseAccount(request.feePayer)
                    : request.feePayer,
            }
            : {}),
        ...(action === 'estimateGas'
            ? {
                maxFeePerGas: '0x0',
                maxPriorityFeePerGas: '0x0',
            }
            : {}),
    };
};
//# sourceMappingURL=formatters.js.map