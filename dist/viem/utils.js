import { encodeFunctionData, } from 'viem';
export function defineCall(call) {
    return {
        ...call,
        data: encodeFunctionData(call),
        to: call.address,
    };
}
//# sourceMappingURL=utils.js.map