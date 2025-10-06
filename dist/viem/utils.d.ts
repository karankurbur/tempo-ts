import { type Abi, type AbiStateMutability, type Address, type ContractFunctionName, type ContractFunctionParameters, type ExtractAbiItem, type Hex } from 'viem';
export declare function defineCall<const abi extends Abi, const functionName extends ContractFunctionName<abi, AbiStateMutability>, call extends ContractFunctionParameters<abi, AbiStateMutability, functionName>>(call: call | ContractFunctionParameters<abi, AbiStateMutability, functionName>): ContractFunctionParameters<[
    ExtractAbiItem<abi, functionName>
], AbiStateMutability, functionName> & {
    data: Hex;
    to: Address;
};
//# sourceMappingURL=utils.d.ts.map