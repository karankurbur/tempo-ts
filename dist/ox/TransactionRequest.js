import * as ox_TransactionRequest from 'ox/TransactionRequest';
import * as TokenId from "./TokenId.js";
import * as Transaction from "./Transaction.js";
/**
 * Converts a {@link ox#TransactionRequest.TransactionRequest} to a {@link ox#TransactionRequest.Rpc}.
 *
 * @example
 * ```ts twoslash
 * import { Value } from 'ox'
 * import { TransactionRequest } from 'ox/tempo'
 *
 * const request = TransactionRequest.toRpc({
 *   feeToken: '0x20c0000000000000000000000000000000000000',
 *   to: '0x0000000000000000000000000000000000000000',
 *   value: Value.fromEther('0.01'),
 * })
 * ```
 *
 * @example
 * ### Using with a Provider
 *
 * You can use {@link ox#Provider.(from:function)} to instantiate an EIP-1193 Provider and
 * send a transaction to the Wallet using the `eth_sendTransaction` method.
 *
 * ```ts twoslash
 * import 'ox/window'
 * import { Provider, Value } from 'ox'
 * import { TransactionRequest } from 'ox/tempo'
 *
 * const provider = Provider.from(window.ethereum!)
 *
 * const request = TransactionRequest.toRpc({
 *   feeToken: '0x20c0000000000000000000000000000000000000',
 *   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   value: Value.fromEther('0.01'),
 * })
 *
 * const hash = await provider.request({ // [!code focus]
 *   method: 'eth_sendTransaction', // [!code focus]
 *   params: [request], // [!code focus]
 * }) // [!code focus]
 * ```
 *
 * @param request - The request to convert.
 * @returns An RPC request.
 */
export function toRpc(request) {
    const request_rpc = ox_TransactionRequest.toRpc(request);
    if (typeof request.feeToken !== 'undefined') {
        request_rpc.feeToken = TokenId.toAddress(request.feeToken);
        request_rpc.type = Transaction.toRpcType.feeToken;
    }
    return request_rpc;
}
//# sourceMappingURL=TransactionRequest.js.map