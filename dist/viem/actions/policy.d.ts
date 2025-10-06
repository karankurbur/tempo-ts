import type { Account, Address, Chain, Client, ExtractAbiItem, GetEventArgs, ReadContractParameters, ReadContractReturnType, Transport, Log as viem_Log, WatchContractEventParameters, WriteContractParameters, WriteContractReturnType } from 'viem';
import type { Compute, UnionOmit } from "../../internal/types.js";
import { tip403RegistryAbi } from "../abis.js";
export type PolicyType = 'whitelist' | 'blacklist';
/**
 * Creates a new policy.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'tempo/chains'
 * import * as actions from 'tempo/viem/actions'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo,
 *   transport: http(),
 * })
 *
 * const { hash, policyId } = await actions.policy.create(client, {
 *   admin: '0x...',
 *   type: 'whitelist',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash and policy ID.
 */
export declare function create<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: create.Parameters<chain, account>): Promise<create.ReturnType>;
export declare namespace create {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = UnionOmit<WriteContractParameters<never, never, never, chain, account>, 'abi' | 'address' | 'functionName' | 'args' | 'type'> & Omit<Args, 'admin'> & {
        /** Address of the policy admin. */
        admin?: Address | undefined;
    };
    type Args = {
        /** Optional array of accounts to initialize the policy with. */
        addresses?: readonly Address[] | undefined;
        /** Address of the policy admin. */
        admin: Address;
        /** Type of policy to create. */
        type: PolicyType;
    };
    type ReturnType = Compute<{
        hash: WriteContractReturnType;
        policyId: bigint;
    }>;
    /**
     * Defines a call to the `createPolicy` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`sendCalls`](https://viem.sh/docs/actions/wallet/sendCalls): send multiple calls
     *
     * @example
     * ```ts
     * import { createClient, http, walletActions } from 'viem'
     * import { tempo } from 'tempo/chains'
     * import * as actions from 'tempo/viem/actions'
     *
     * const client = createClient({
     *   chain: tempo,
     *   transport: http(),
     * }).extend(walletActions)
     *
     * const { result } = await client.sendCalls({
     *   calls: [
     *     actions.policy.create.call({
     *       admin: '0xfeed...fede',
     *       type: 'whitelist',
     *     }),
     *     actions.policy.create.call({
     *       admin: '0xfeed...fede',
     *       type: 'blacklist',
     *       addresses: ['0x20c0...beef', '0x20c0...babe'],
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly type: "function";
            readonly name: "createPolicy";
            readonly inputs: readonly [{
                readonly name: "admin";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "policyType";
                readonly type: "uint8";
                readonly internalType: "enum TIP403Registry.PolicyType";
            }, {
                readonly name: "accounts";
                readonly type: "address[]";
                readonly internalType: "address[]";
            }];
            readonly outputs: readonly [{
                readonly name: "newPolicyId";
                readonly type: "uint64";
                readonly internalType: "uint64";
            }];
            readonly stateMutability: "nonpayable";
        } | {
            readonly type: "function";
            readonly name: "createPolicy";
            readonly inputs: readonly [{
                readonly name: "admin";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "policyType";
                readonly type: "uint8";
                readonly internalType: "enum TIP403Registry.PolicyType";
            }];
            readonly outputs: readonly [{
                readonly name: "newPolicyId";
                readonly type: "uint64";
                readonly internalType: "uint64";
            }];
            readonly stateMutability: "nonpayable";
        }];
        functionName: "createPolicy";
        args?: readonly [`0x${string}`, number, readonly `0x${string}`[]] | readonly [`0x${string}`, number] | readonly [`0x${string}`, number, readonly `0x${string}`[]] | undefined;
    } & {
        args: import("viem").Widen<readonly [`0x${string}`, number, readonly `0x${string}`[]] | readonly [`0x${string}`, number]>;
    } & {
        address: Address;
    } & {
        data: import("viem").Hex;
        to: Address;
    };
}
/**
 * Sets the admin for a policy.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'tempo/chains'
 * import * as actions from 'tempo/viem/actions'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo,
 *   transport: http(),
 * })
 *
 * const hash = await actions.policy.setAdmin(client, {
 *   policyId: 2n,
 *   admin: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function setAdmin<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: setAdmin.Parameters<chain, account>): Promise<setAdmin.ReturnType>;
export declare namespace setAdmin {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = UnionOmit<WriteContractParameters<never, never, never, chain, account>, 'abi' | 'address' | 'functionName' | 'args'> & Args;
    type Args = {
        /** New admin address. */
        admin: Address;
        /** Policy ID. */
        policyId: bigint;
    };
    type ReturnType = WriteContractReturnType;
    /**
     * Defines a call to the `setPolicyAdmin` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`sendCalls`](https://viem.sh/docs/actions/wallet/sendCalls): send multiple calls
     *
     * @example
     * ```ts
     * import { createClient, http, walletActions } from 'viem'
     * import { tempo } from 'tempo/chains'
     * import * as actions from 'tempo/viem/actions'
     *
     * const client = createClient({
     *   chain: tempo,
     *   transport: http(),
     * }).extend(walletActions)
     *
     * const { result } = await client.sendCalls({
     *   calls: [
     *     actions.policy.setAdmin.call({
     *       policyId: 2n,
     *       admin: '0xfeed...fede',
     *     }),
     *     actions.policy.setAdmin.call({
     *       policyId: 3n,
     *       admin: '0xfeed...babe',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly type: "function";
            readonly name: "setPolicyAdmin";
            readonly inputs: readonly [{
                readonly name: "policyId";
                readonly type: "uint64";
                readonly internalType: "uint64";
            }, {
                readonly name: "admin";
                readonly type: "address";
                readonly internalType: "address";
            }];
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
        }];
        functionName: "setPolicyAdmin";
        args?: readonly [bigint, `0x${string}`] | undefined;
    } & {
        args: readonly [bigint, `0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("viem").Hex;
        to: Address;
    };
}
/**
 * Modifies a policy whitelist.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'tempo/chains'
 * import * as actions from 'tempo/viem/actions'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo,
 *   transport: http(),
 * })
 *
 * const hash = await actions.policy.modifyWhitelist(client, {
 *   policyId: 2n,
 *   account: '0x...',
 *   allowed: true,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function modifyWhitelist<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: modifyWhitelist.Parameters<chain, account>): Promise<modifyWhitelist.ReturnType>;
export declare namespace modifyWhitelist {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = UnionOmit<WriteContractParameters<never, never, never, chain, account>, 'abi' | 'address' | 'functionName' | 'args'> & Args;
    type Args = {
        /** Target account address. */
        address: Address;
        /** Whether the account is allowed. */
        allowed: boolean;
        /** Policy ID. */
        policyId: bigint;
    };
    type ReturnType = WriteContractReturnType;
    /**
     * Defines a call to the `modifyPolicyWhitelist` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`sendCalls`](https://viem.sh/docs/actions/wallet/sendCalls): send multiple calls
     *
     * @example
     * ```ts
     * import { createClient, http, walletActions } from 'viem'
     * import { tempo } from 'tempo/chains'
     * import * as actions from 'tempo/viem/actions'
     *
     * const client = createClient({
     *   chain: tempo,
     *   transport: http(),
     * }).extend(walletActions)
     *
     * const { result } = await client.sendCalls({
     *   calls: [
     *     actions.policy.modifyWhitelist.call({
     *       policyId: 2n,
     *       address: '0x20c0...beef',
     *       allowed: true,
     *     }),
     *     actions.policy.modifyWhitelist.call({
     *       policyId: 2n,
     *       address: '0x20c0...babe',
     *       allowed: false,
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly type: "function";
            readonly name: "modifyPolicyWhitelist";
            readonly inputs: readonly [{
                readonly name: "policyId";
                readonly type: "uint64";
                readonly internalType: "uint64";
            }, {
                readonly name: "account";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "allowed";
                readonly type: "bool";
                readonly internalType: "bool";
            }];
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
        }];
        functionName: "modifyPolicyWhitelist";
        args?: readonly [bigint, `0x${string}`, boolean] | readonly [bigint, `0x${string}`, import("viem").Widen<boolean>] | undefined;
    } & {
        args: readonly [bigint, `0x${string}`, import("viem").Widen<boolean>];
    } & {
        address: Address;
    } & {
        data: import("viem").Hex;
        to: Address;
    };
}
/**
 * Modifies a policy blacklist.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'tempo/chains'
 * import * as actions from 'tempo/viem/actions'
 * import { privateKeyToAccount } from 'viem/accounts'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo,
 *   transport: http(),
 * })
 *
 * const hash = await actions.policy.modifyBlacklist(client, {
 *   policyId: 2n,
 *   account: '0x...',
 *   restricted: true,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function modifyBlacklist<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: modifyBlacklist.Parameters<chain, account>): Promise<modifyBlacklist.ReturnType>;
export declare namespace modifyBlacklist {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = UnionOmit<WriteContractParameters<never, never, never, chain, account>, 'abi' | 'address' | 'functionName' | 'args'> & Args;
    type Args = {
        /** Target account address. */
        address: Address;
        /** Policy ID. */
        policyId: bigint;
        /** Whether the account is restricted. */
        restricted: boolean;
    };
    type ReturnType = WriteContractReturnType;
    /**
     * Defines a call to the `modifyPolicyBlacklist` function.
     *
     * Can be passed as a parameter to:
     * - [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas): estimate the gas cost of the call
     * - [`simulateContract`](https://viem.sh/docs/contract/simulateContract): simulate the call
     * - [`sendCalls`](https://viem.sh/docs/actions/wallet/sendCalls): send multiple calls
     *
     * @example
     * ```ts
     * import { createClient, http, walletActions } from 'viem'
     * import { tempo } from 'tempo/chains'
     * import * as actions from 'tempo/viem/actions'
     *
     * const client = createClient({
     *   chain: tempo,
     *   transport: http(),
     * }).extend(walletActions)
     *
     * const { result } = await client.sendCalls({
     *   calls: [
     *     actions.policy.modifyBlacklist.call({
     *       policyId: 2n,
     *       address: '0x20c0...beef',
     *       restricted: true,
     *     }),
     *     actions.policy.modifyBlacklist.call({
     *       policyId: 2n,
     *       address: '0x20c0...babe',
     *       restricted: false,
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly type: "function";
            readonly name: "modifyPolicyBlacklist";
            readonly inputs: readonly [{
                readonly name: "policyId";
                readonly type: "uint64";
                readonly internalType: "uint64";
            }, {
                readonly name: "account";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "restricted";
                readonly type: "bool";
                readonly internalType: "bool";
            }];
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
        }];
        functionName: "modifyPolicyBlacklist";
        args?: readonly [bigint, `0x${string}`, boolean] | readonly [bigint, `0x${string}`, import("viem").Widen<boolean>] | undefined;
    } & {
        args: readonly [bigint, `0x${string}`, import("viem").Widen<boolean>];
    } & {
        address: Address;
    } & {
        data: import("viem").Hex;
        to: Address;
    };
}
/**
 * Gets policy data.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'tempo/chains'
 * import * as actions from 'tempo/viem/actions'
 *
 * const client = createClient({
 *   chain: tempo,
 *   transport: http(),
 * })
 *
 * const data = await actions.policy.getData(client, {
 *   policyId: 2n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The policy data.
 */
export declare function getData<chain extends Chain | undefined>(client: Client<Transport, chain>, parameters: getData.Parameters): Promise<getData.ReturnType>;
export declare namespace getData {
    type Parameters = UnionOmit<ReadContractParameters<never, never, never>, 'abi' | 'address' | 'functionName' | 'args'> & Args;
    type Args = {
        /** Policy ID. */
        policyId: bigint;
    };
    type ReturnType = Compute<{
        /** Admin address. */
        admin: Address;
        /** Policy type. */
        type: PolicyType;
    }>;
    /**
     * Defines a call to the `policyData` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly type: "function";
            readonly name: "policyData";
            readonly inputs: readonly [{
                readonly name: "";
                readonly type: "uint64";
                readonly internalType: "uint64";
            }];
            readonly outputs: readonly [{
                readonly name: "policyType";
                readonly type: "uint8";
                readonly internalType: "enum TIP403Registry.PolicyType";
            }, {
                readonly name: "admin";
                readonly type: "address";
                readonly internalType: "address";
            }];
            readonly stateMutability: "view";
        }];
        functionName: "policyData";
        args?: readonly [bigint] | undefined;
    } & {
        args: readonly [bigint];
    } & {
        address: Address;
    } & {
        data: import("viem").Hex;
        to: Address;
    };
}
/**
 * Checks if a user is authorized by a policy.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'tempo/chains'
 * import * as actions from 'tempo/viem/actions'
 *
 * const client = createClient({
 *   chain: tempo,
 *   transport: http(),
 * })
 *
 * const authorized = await actions.policy.isAuthorized(client, {
 *   policyId: 2n,
 *   user: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns Whether the user is authorized.
 */
export declare function isAuthorized<chain extends Chain | undefined>(client: Client<Transport, chain>, parameters: isAuthorized.Parameters): Promise<isAuthorized.ReturnType>;
export declare namespace isAuthorized {
    type Parameters = UnionOmit<ReadContractParameters<never, never, never>, 'abi' | 'address' | 'functionName' | 'args'> & Args;
    type Args = {
        /** Policy ID. */
        policyId: bigint;
        /** User address to check. */
        user: Address;
    };
    type ReturnType = ReadContractReturnType<typeof tip403RegistryAbi, 'isAuthorized', never>;
    /**
     * Defines a call to the `isAuthorized` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly type: "function";
            readonly name: "isAuthorized";
            readonly inputs: readonly [{
                readonly name: "policyId";
                readonly type: "uint64";
                readonly internalType: "uint64";
            }, {
                readonly name: "user";
                readonly type: "address";
                readonly internalType: "address";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "bool";
                readonly internalType: "bool";
            }];
            readonly stateMutability: "view";
        }];
        functionName: "isAuthorized";
        args?: readonly [bigint, `0x${string}`] | undefined;
    } & {
        args: readonly [bigint, `0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("viem").Hex;
        to: Address;
    };
}
/**
 * Watches for policy creation events.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'tempo/chains'
 * import * as actions from 'tempo/viem/actions'
 *
 * const client = createClient({
 *   chain: tempo,
 *   transport: http(),
 * })
 *
 * const unwatch = actions.policy.watchCreate(client, {
 *   onPolicyCreated: (args, log) => {
 *     console.log('Policy created:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export declare function watchCreate<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchCreate.Parameters): import("viem").WatchContractEventReturnType;
export declare namespace watchCreate {
    type Args = Compute<{
        policyId: bigint;
        updater: Address;
        type: PolicyType;
    }>;
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof tip403RegistryAbi, 'PolicyCreated'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof tip403RegistryAbi, 'PolicyCreated', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Callback to invoke when a policy is created. */
        onPolicyCreated: (args: Args, log: Log) => void;
    };
}
/**
 * Watches for policy admin update events.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'tempo/chains'
 * import * as actions from 'tempo/viem/actions'
 *
 * const client = createClient({
 *   chain: tempo,
 *   transport: http(),
 * })
 *
 * const unwatch = actions.policy.watchAdminUpdated(client, {
 *   onAdminUpdated: (args, log) => {
 *     console.log('Policy admin updated:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export declare function watchAdminUpdated<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchAdminUpdated.Parameters): import("viem").WatchContractEventReturnType;
export declare namespace watchAdminUpdated {
    type Args = GetEventArgs<typeof tip403RegistryAbi, 'PolicyAdminUpdated', {
        IndexedOnly: false;
        Required: true;
    }>;
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof tip403RegistryAbi, 'PolicyAdminUpdated'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof tip403RegistryAbi, 'PolicyAdminUpdated', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Callback to invoke when a policy admin is updated. */
        onAdminUpdated: (args: Args, log: Log) => void;
    };
}
/**
 * Watches for whitelist update events.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'tempo/chains'
 * import * as actions from 'tempo/viem/actions'
 *
 * const client = createClient({
 *   chain: tempo,
 *   transport: http(),
 * })
 *
 * const unwatch = actions.policy.watchWhitelistUpdated(client, {
 *   onWhitelistUpdated: (args, log) => {
 *     console.log('Whitelist updated:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export declare function watchWhitelistUpdated<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchWhitelistUpdated.Parameters): import("viem").WatchContractEventReturnType;
export declare namespace watchWhitelistUpdated {
    type Args = GetEventArgs<typeof tip403RegistryAbi, 'WhitelistUpdated', {
        IndexedOnly: false;
        Required: true;
    }>;
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof tip403RegistryAbi, 'WhitelistUpdated'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof tip403RegistryAbi, 'WhitelistUpdated', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Callback to invoke when a whitelist is updated. */
        onWhitelistUpdated: (args: Args, log: Log) => void;
    };
}
/**
 * Watches for blacklist update events.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'tempo/chains'
 * import * as actions from 'tempo/viem/actions'
 *
 * const client = createClient({
 *   chain: tempo,
 *   transport: http(),
 * })
 *
 * const unwatch = actions.policy.watchBlacklistUpdated(client, {
 *   onBlacklistUpdated: (args, log) => {
 *     console.log('Blacklist updated:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export declare function watchBlacklistUpdated<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchBlacklistUpdated.Parameters): import("viem").WatchContractEventReturnType;
export declare namespace watchBlacklistUpdated {
    type Args = GetEventArgs<typeof tip403RegistryAbi, 'BlacklistUpdated', {
        IndexedOnly: false;
        Required: true;
    }>;
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof tip403RegistryAbi, 'BlacklistUpdated'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof tip403RegistryAbi, 'BlacklistUpdated', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Callback to invoke when a blacklist is updated. */
        onBlacklistUpdated: (args: Args, log: Log) => void;
    };
}
//# sourceMappingURL=policy.d.ts.map