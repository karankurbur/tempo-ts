import * as Hex from 'ox/Hex';
import * as Signature from 'ox/Signature';
import { type Account, type Address, type Chain, type Client, type ExtractAbiItem, type GetEventArgs, type ReadContractParameters, type ReadContractReturnType, type SendTransactionParameters, type Transport, type ValueOf, type Log as viem_Log, type WatchContractEventParameters, type WriteContractParameters, type WriteContractReturnType } from 'viem';
import type { Compute, UnionOmit } from "../../internal/types.js";
import * as TokenId from "../../ox/TokenId.js";
import * as TokenRole from "../../ox/TokenRole.js";
import { tip20Abi, tip20FactoryAbi } from "../abis.js";
import type { GetAccountParameter } from "../types.js";
declare const transferPolicy: {
    readonly 0: "always-reject";
    readonly 1: "always-allow";
};
type TransferPolicy = ValueOf<typeof transferPolicy>;
/**
 * Approves a spender to transfer TIP20 tokens on behalf of the caller.
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
 * const hash = await actions.token.approve(client, {
 *   spender: '0x...',
 *   amount: 100n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function approve<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: approve.Parameters<chain, account>): Promise<approve.ReturnType>;
export declare namespace approve {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = UnionOmit<WriteContractParameters<never, never, never, chain, account>, 'abi' | 'address' | 'functionName' | 'args'> & Args;
    type Args = {
        /** Amount of tokens to approve. */
        amount: bigint;
        /** Address of the spender. */
        spender: Address;
        /** Address or ID of the TIP20 token. @default `usdAddress` */
        token?: TokenId.TokenIdOrAddress | undefined;
    };
    type ReturnType = WriteContractReturnType;
    /**
     * Defines a call to the `approve` function.
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
     *     actions.token.approve.call({
     *       spender: '0x20c0...beef',
     *       amount: 100n,
     *       token: '0x20c0...babe',
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
            readonly name: "approve";
            readonly inputs: readonly [{
                readonly name: "spender";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "amount";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "bool";
                readonly internalType: "bool";
            }];
            readonly stateMutability: "nonpayable";
        }];
        functionName: "approve";
        args?: readonly [`0x${string}`, bigint] | undefined;
    } & {
        args: readonly [`0x${string}`, bigint];
    } & {
        address: Address;
    } & {
        data: import("viem").Hex;
        to: Address;
    };
}
/**
 * Burns TIP20 tokens from a blocked address.
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
 * const hash = await actions.token.burnBlocked(client, {
 *   from: '0x...',
 *   amount: 100n,
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function burnBlocked<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: burnBlocked.Parameters<chain, account>): Promise<burnBlocked.ReturnType>;
export declare namespace burnBlocked {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = UnionOmit<WriteContractParameters<never, never, never, chain, account>, 'abi' | 'address' | 'functionName' | 'args'> & Args;
    type Args = {
        /** Amount of tokens to burn. */
        amount: bigint;
        /** Address to burn tokens from. */
        from: Address;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnType = WriteContractReturnType;
    /**
     * Defines a call to the `burnBlocked` function.
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
     *     actions.token.burnBlocked.call({
     *       from: '0x20c0...beef',
     *       amount: 100n,
     *       token: '0x20c0...babe',
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
            readonly name: "burnBlocked";
            readonly inputs: readonly [{
                readonly name: "from";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "amount";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }];
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
        }];
        functionName: "burnBlocked";
        args?: readonly [`0x${string}`, bigint] | undefined;
    } & {
        args: readonly [`0x${string}`, bigint];
    } & {
        address: Address;
    } & {
        data: import("viem").Hex;
        to: Address;
    };
}
/**
 * Burns TIP20 tokens from the caller's balance.
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
 * const hash = await actions.token.burn(client, {
 *   amount: 100n,
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function burn<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: burn.Parameters<chain, account>): Promise<burn.ReturnType>;
export declare namespace burn {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = UnionOmit<WriteContractParameters<never, never, never, chain, account>, 'abi' | 'address' | 'functionName' | 'args'> & Args;
    type Args = {
        /** Amount of tokens to burn. */
        amount: bigint;
        /** Memo to include in the transfer. */
        memo?: Hex.Hex | undefined;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnType = WriteContractReturnType;
    /**
     * Defines a call to the `burn` or `burnWithMemo` function.
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
     *     actions.token.burn.call({
     *       amount: 100n,
     *       token: '0x20c0...babe',
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
            readonly name: "burn";
            readonly inputs: readonly [{
                readonly name: "amount";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }];
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
        } | {
            readonly type: "function";
            readonly name: "burnWithMemo";
            readonly inputs: readonly [{
                readonly name: "amount";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }, {
                readonly name: "memo";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
        }];
        functionName: "burn" | "burnWithMemo";
        args?: readonly [bigint] | readonly [bigint, `0x${string}`] | undefined;
    } & {
        args: import("viem").Widen<readonly [bigint] | readonly [bigint, `0x${string}`]>;
    } & {
        address: Address;
    } & {
        data: import("viem").Hex;
        to: Address;
    };
}
/**
 * Changes the transfer policy ID for a TIP20 token.
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
 * const hash = await actions.token.changeTransferPolicy(client, {
 *   token: '0x...',
 *   policyId: 1n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function changeTransferPolicy<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: changeTransferPolicy.Parameters<chain, account>): Promise<changeTransferPolicy.ReturnType>;
export declare namespace changeTransferPolicy {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = UnionOmit<WriteContractParameters<never, never, never, chain, account>, 'abi' | 'address' | 'functionName' | 'args'> & Args;
    type Args = {
        /** New transfer policy ID. */
        policyId: bigint;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnType = WriteContractReturnType;
    /**
     * Defines a call to the `changeTransferPolicyId` function.
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
     *     actions.token.changeTransferPolicy.call({
     *       token: '0x20c0...babe',
     *       policyId: 1n,
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
            readonly name: "changeTransferPolicyId";
            readonly inputs: readonly [{
                readonly name: "newPolicyId";
                readonly type: "uint64";
                readonly internalType: "uint64";
            }];
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
        }];
        functionName: "changeTransferPolicyId";
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
 * Creates a new TIP20 token.
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
 * const { hash, id, address } = await actions.token.create(client, {
 *   name: 'My Token',
 *   symbol: 'MTK',
 *   currency: 'USD',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function create<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: create.Parameters<chain, account>): Promise<create.ReturnType>;
export declare namespace create {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = UnionOmit<WriteContractParameters<never, never, never, chain, account>, 'abi' | 'address' | 'functionName' | 'args'> & Omit<Args, 'admin'> & (account extends Account ? {
        admin?: Account | Address | undefined;
    } : {
        admin: Account | Address;
    });
    type Args = {
        /** Admin address. */
        admin: Address;
        /** Currency (e.g. "USD"). */
        currency: string;
        /** Token name. */
        name: string;
        /** Token symbol. */
        symbol: string;
    };
    type ReturnType = Compute<{
        /** Address of the created TIP20 token. */
        address: Address;
        /** Admin of the token. */
        admin: Address;
        /** Transaction hash. */
        hash: Hex.Hex;
        /** ID of the TIP20 token. */
        id: bigint;
    }>;
    /**
     * Defines a call to the `createToken` function.
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
     *     actions.token.create.call({
     *       name: 'My Token',
     *       symbol: 'MTK',
     *       currency: 'USD',
     *       admin: '0xfeed...fede',
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
            readonly name: "createToken";
            readonly inputs: readonly [{
                readonly name: "name";
                readonly type: "string";
                readonly internalType: "string";
            }, {
                readonly name: "symbol";
                readonly type: "string";
                readonly internalType: "string";
            }, {
                readonly name: "currency";
                readonly type: "string";
                readonly internalType: "string";
            }, {
                readonly name: "admin";
                readonly type: "address";
                readonly internalType: "address";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "address";
                readonly internalType: "address";
            }];
            readonly stateMutability: "nonpayable";
        }];
        functionName: "createToken";
        args?: readonly [string, string, string, `0x${string}`] | undefined;
    } & {
        args: readonly [string, string, string, `0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("viem").Hex;
        to: Address;
    };
}
/**
 * Gets TIP20 token allowance.
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
 * const allowance = await actions.token.getAllowance(client, {
 *   spender: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The token allowance.
 */
export declare function getAllowance<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: getAllowance.Parameters<account>): Promise<getAllowance.ReturnType>;
export declare namespace getAllowance {
    type Parameters<account extends Account | undefined = Account | undefined> = UnionOmit<ReadContractParameters<never, never, never>, 'abi' | 'address' | 'functionName' | 'args'> & GetAccountParameter<account> & Omit<Args, 'account'> & {};
    type Args = {
        /** Account address. */
        account: Address;
        /** Address of the spender. */
        spender: Address;
        /** Address or ID of the TIP20 token. @default `usdAddress` */
        token?: TokenId.TokenIdOrAddress | undefined;
    };
    type ReturnType = ReadContractReturnType<typeof tip20Abi, 'allowance', never>;
    /**
     * Defines a call to the `allowance` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly type: "function";
            readonly name: "allowance";
            readonly inputs: readonly [{
                readonly name: "";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "";
                readonly type: "address";
                readonly internalType: "address";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }];
            readonly stateMutability: "view";
        }];
        functionName: "allowance";
        args?: readonly [`0x${string}`, `0x${string}`] | undefined;
    } & {
        args: readonly [`0x${string}`, `0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("viem").Hex;
        to: Address;
    };
}
/**
 * Gets TIP20 token balance for an address.
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
 * const balance = await actions.token.getBalance(client, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The token balance.
 */
export declare function getBalance<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, ...parameters: account extends Account ? [getBalance.Parameters<account>] | [] : [getBalance.Parameters<account>]): Promise<getBalance.ReturnType>;
export declare namespace getBalance {
    type Parameters<account extends Account | undefined = Account | undefined> = UnionOmit<ReadContractParameters<never, never, never>, 'abi' | 'address' | 'functionName' | 'args'> & GetAccountParameter<account> & Omit<Args, 'account'>;
    type Args = {
        /** Account address. */
        account: Address;
        /** Address or ID of the TIP20 token. @default `usdAddress` */
        token?: TokenId.TokenIdOrAddress | undefined;
    };
    type ReturnType = ReadContractReturnType<typeof tip20Abi, 'balanceOf', never>;
    /**
     * Defines a call to the `balanceOf` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args: Args): {
        abi: [{
            readonly type: "function";
            readonly name: "balanceOf";
            readonly inputs: readonly [{
                readonly name: "";
                readonly type: "address";
                readonly internalType: "address";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }];
            readonly stateMutability: "view";
        }];
        functionName: "balanceOf";
        args?: readonly [`0x${string}`] | undefined;
    } & {
        args: readonly [`0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("viem").Hex;
        to: Address;
    };
}
/**
 * Gets TIP20 token metadata including name, symbol, currency, decimals, and total supply.
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
 * const metadata = await actions.token.getMetadata(client, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The token metadata.
 */
export declare function getMetadata<chain extends Chain | undefined>(client: Client<Transport, chain>, parameters?: getMetadata.Parameters): Promise<getMetadata.ReturnType>;
export declare namespace getMetadata {
    type Parameters = {
        /** Address or ID of the TIP20 token. @default `usdAddress` */
        token?: TokenId.TokenIdOrAddress | undefined;
    };
    type ReturnType = Compute<{
        /** Currency (e.g. "USD"). */
        currency: string;
        /** Decimals. */
        decimals: number;
        /** Name. */
        name: string;
        /** Whether the token is paused. */
        paused: boolean;
        /** Supply cap. */
        supplyCap: bigint;
        /** Symbol. */
        symbol: string;
        /** Total supply. */
        totalSupply: bigint;
        /** Transfer policy. */
        transferPolicy: TransferPolicy;
    }>;
}
/**
 * Grants a role for a TIP20 token.
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
 * const hash = await actions.token.grantRoles(client, {
 *   token: '0x...',
 *   to: '0x...',
 *   roles: ['minter'],
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function grantRoles<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: grantRoles.Parameters<chain, account>): Promise<grantRoles.ReturnType>;
export declare namespace grantRoles {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = UnionOmit<WriteContractParameters<never, never, never, chain, account>, 'abi' | 'address' | 'functionName' | 'args'> & Omit<Args, 'role'> & {
        /** Role to grant. */
        roles: readonly TokenRole.TokenRole[];
    };
    type Args = {
        /** Role to grant. */
        role: TokenRole.TokenRole;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
        /** Address to grant the role to. */
        to: Address;
    };
    type ReturnType = WriteContractReturnType;
    /**
     * Defines a call to the `grantRole` function.
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
     *     actions.token.grantRoles.call({
     *       token: '0x20c0...babe',
     *       to: '0x20c0...beef',
     *       role: 'minter',
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
            readonly name: "grantRole";
            readonly inputs: readonly [{
                readonly name: "role";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }, {
                readonly name: "account";
                readonly type: "address";
                readonly internalType: "address";
            }];
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
        }];
        functionName: "grantRole";
        args?: readonly [`0x${string}`, `0x${string}`] | undefined;
    } & {
        args: readonly [`0x${string}`, `0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("viem").Hex;
        to: Address;
    };
}
/**
 * Mints TIP20 tokens to an address.
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
 * const hash = await actions.token.mint(client, {
 *   to: '0x...',
 *   amount: 100n,
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function mint<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: mint.Parameters<chain, account>): Promise<mint.ReturnType>;
export declare namespace mint {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = UnionOmit<WriteContractParameters<never, never, never, chain, account>, 'abi' | 'address' | 'functionName' | 'args'> & Args;
    type Args = {
        /** Amount of tokens to mint. */
        amount: bigint;
        /** Memo to include in the mint. */
        memo?: Hex.Hex | undefined;
        /** Address to mint tokens to. */
        to: Address;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnType = WriteContractReturnType;
    /**
     * Defines a call to the `mint` or `mintWithMemo` function.
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
     *     actions.token.mint.call({
     *       to: '0x20c0...beef',
     *       amount: 100n,
     *       token: '0x20c0...babe',
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
            readonly name: "mint";
            readonly inputs: readonly [{
                readonly name: "to";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "amount";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }];
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
        } | {
            readonly type: "function";
            readonly name: "mintWithMemo";
            readonly inputs: readonly [{
                readonly name: "to";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "amount";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }, {
                readonly name: "memo";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
        }];
        functionName: "mint" | "mintWithMemo";
        args?: readonly [`0x${string}`, bigint] | readonly [`0x${string}`, bigint, `0x${string}`] | undefined;
    } & {
        args: import("viem").Widen<readonly [`0x${string}`, bigint] | readonly [`0x${string}`, bigint, `0x${string}`]>;
    } & {
        address: Address;
    } & {
        data: import("viem").Hex;
        to: Address;
    };
}
/**
 * Pauses a TIP20 token.
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
 * const hash = await actions.token.pause(client, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function pause<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: pause.Parameters<chain, account>): Promise<pause.ReturnType>;
export declare namespace pause {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = UnionOmit<WriteContractParameters<never, never, never, chain, account>, 'abi' | 'address' | 'functionName' | 'args'> & Args;
    type Args = {
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnType = WriteContractReturnType;
    /**
     * Defines a call to the `pause` function.
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
     *     actions.token.pause.call({
     *       token: '0x20c0...babe',
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
            readonly name: "pause";
            readonly inputs: readonly [];
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
        }];
        functionName: "pause";
        args?: readonly [] | undefined;
    } & {
        address: Address;
    } & {
        data: import("viem").Hex;
        to: Address;
    };
}
/**
 * Approves a spender using a signed permit.
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
 * const hash = await actions.token.permit(client, {
 *   owner: '0x...',
 *   spender: '0x...',
 *   value: 100n,
 *   deadline: 1234567890n,
 *   signature: { r: 0n, s: 0n, yParity: 0 },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function permit<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: permit.Parameters<chain, account>): Promise<permit.ReturnType>;
export declare namespace permit {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = UnionOmit<WriteContractParameters<never, never, never, chain, account>, 'abi' | 'address' | 'functionName' | 'args'> & Args;
    type Args = {
        /** Deadline for the permit. */
        deadline: bigint;
        /** Address of the owner. */
        owner: Address;
        /** Signature. */
        signature: Signature.Signature;
        /** Address of the spender. */
        spender: Address;
        /** Address or ID of the TIP20 token. @default `usdAddress` */
        token?: TokenId.TokenIdOrAddress | undefined;
        /** Amount to approve. */
        value: bigint;
    };
    type ReturnType = WriteContractReturnType;
    /**
     * Defines a call to the `permit` function.
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
     *     actions.token.permit.call({
     *       owner: '0x20c0...beef',
     *       spender: '0x20c0...babe',
     *       value: 100n,
     *       deadline: 1234567890n,
     *       signature: { r: 0n, s: 0n, yParity: 0 },
     *       token: '0x20c0...cafe',
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
            readonly name: "permit";
            readonly inputs: readonly [{
                readonly name: "owner";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "spender";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "value";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }, {
                readonly name: "deadline";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }, {
                readonly name: "v";
                readonly type: "uint8";
                readonly internalType: "uint8";
            }, {
                readonly name: "r";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }, {
                readonly name: "s";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
        }];
        functionName: "permit";
        args?: readonly [`0x${string}`, `0x${string}`, bigint, bigint, number, `0x${string}`, `0x${string}`] | undefined;
    } & {
        args: readonly [`0x${string}`, `0x${string}`, bigint, bigint, number, `0x${string}`, `0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("viem").Hex;
        to: Address;
    };
}
/**
 * Renounces a role for a TIP20 token.
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
 * const hash = await actions.token.renounceRoles(client, {
 *   token: '0x...',
 *   roles: ['minter'],
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function renounceRoles<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: renounceRoles.Parameters<chain, account>): Promise<renounceRoles.ReturnType>;
export declare namespace renounceRoles {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = UnionOmit<WriteContractParameters<never, never, never, chain, account>, 'abi' | 'address' | 'functionName' | 'args'> & Omit<Args, 'role'> & {
        /** Roles to renounce. */
        roles: readonly TokenRole.TokenRole[];
    };
    type Args = {
        /** Role to renounce. */
        role: TokenRole.TokenRole;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnType = WriteContractReturnType;
    /**
     * Defines a call to the `renounceRole` function.
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
     *     actions.token.renounceRoles.call({
     *       token: '0x20c0...babe',
     *       role: 'minter',
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
            readonly name: "renounceRole";
            readonly inputs: readonly [{
                readonly name: "role";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
        }];
        functionName: "renounceRole";
        args?: readonly [`0x${string}`] | undefined;
    } & {
        args: readonly [`0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("viem").Hex;
        to: Address;
    };
}
/**
 * Revokes a role for a TIP20 token.
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
 * const hash = await actions.token.revokeRoles(client, {
 *   token: '0x...',
 *   from: '0x...',
 *   roles: ['minter'],
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function revokeRoles<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: revokeRoles.Parameters<chain, account>): Promise<revokeRoles.ReturnType>;
export declare namespace revokeRoles {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = SendTransactionParameters<chain, account> & Omit<Args, 'role'> & {
        /** Role to revoke. */
        roles: readonly TokenRole.TokenRole[];
    };
    type Args = {
        /** Address to revoke the role from. */
        from: Address;
        /** Role to revoke. */
        role: TokenRole.TokenRole;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnType = WriteContractReturnType;
    /**
     * Defines a call to the `revokeRole` function.
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
     *     actions.token.revokeRoles.call({
     *       token: '0x20c0...babe',
     *       from: '0x20c0...beef',
     *       role: 'minter',
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
            readonly name: "revokeRole";
            readonly inputs: readonly [{
                readonly name: "role";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }, {
                readonly name: "account";
                readonly type: "address";
                readonly internalType: "address";
            }];
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
        }];
        functionName: "revokeRole";
        args?: readonly [`0x${string}`, `0x${string}`] | undefined;
    } & {
        args: readonly [`0x${string}`, `0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("viem").Hex;
        to: Address;
    };
}
/**
 * Sets the supply cap for a TIP20 token.
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
 * const hash = await actions.token.setSupplyCap(client, {
 *   token: '0x...',
 *   supplyCap: 1000000n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function setSupplyCap<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: setSupplyCap.Parameters<chain, account>): Promise<setSupplyCap.ReturnType>;
export declare namespace setSupplyCap {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = UnionOmit<WriteContractParameters<never, never, never, chain, account>, 'abi' | 'address' | 'functionName' | 'args'> & Args;
    type Args = {
        /** New supply cap. */
        supplyCap: bigint;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnType = WriteContractReturnType;
    /**
     * Defines a call to the `setSupplyCap` function.
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
     *     actions.token.setSupplyCap.call({
     *       token: '0x20c0...babe',
     *       supplyCap: 1000000n,
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
            readonly name: "setSupplyCap";
            readonly inputs: readonly [{
                readonly name: "newSupplyCap";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }];
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
        }];
        functionName: "setSupplyCap";
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
 * Sets the admin role for a specific role in a TIP20 token.
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
 * const hash = await actions.token.setRoleAdmin(client, {
 *   token: '0x...',
 *   role: 'minter',
 *   adminRole: 'admin',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function setRoleAdmin<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: setRoleAdmin.Parameters<chain, account>): Promise<setRoleAdmin.ReturnType>;
export declare namespace setRoleAdmin {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = UnionOmit<WriteContractParameters<never, never, never, chain, account>, 'abi' | 'address' | 'functionName' | 'args'> & Args;
    type Args = {
        /** New admin role. */
        adminRole: TokenRole.TokenRole;
        /** Role to set admin for. */
        role: TokenRole.TokenRole;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnType = WriteContractReturnType;
    /**
     * Defines a call to the `setRoleAdmin` function.
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
     *     actions.token.setRoleAdmin.call({
     *       token: '0x20c0...babe',
     *       role: 'minter',
     *       adminRole: 'admin',
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
            readonly name: "setRoleAdmin";
            readonly inputs: readonly [{
                readonly name: "role";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }, {
                readonly name: "adminRole";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
        }];
        functionName: "setRoleAdmin";
        args?: readonly [`0x${string}`, `0x${string}`] | undefined;
    } & {
        args: readonly [`0x${string}`, `0x${string}`];
    } & {
        address: Address;
    } & {
        data: import("viem").Hex;
        to: Address;
    };
}
/**
 * Transfers TIP20 tokens to another address.
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
 * const hash = await actions.token.transfer(client, {
 *   to: '0x...',
 *   amount: 100n,
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function transfer<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: transfer.Parameters<chain, account>): Promise<transfer.ReturnType>;
export declare namespace transfer {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = UnionOmit<WriteContractParameters<never, never, never, chain, account>, 'abi' | 'address' | 'functionName' | 'args'> & Args;
    type Args = {
        /** Amount of tokens to transfer. */
        amount: bigint;
        /** Address to transfer tokens from. */
        from?: Address | undefined;
        /** Memo to include in the transfer. */
        memo?: Hex.Hex | undefined;
        /** Address or ID of the TIP20 token. @default `usdAddress` */
        token?: TokenId.TokenIdOrAddress | undefined;
        /** Address to transfer tokens to. */
        to: Address;
    };
    type ReturnType = WriteContractReturnType;
    /**
     * Defines a call to the `transfer`, `transferFrom`, `transferWithMemo`, or `transferFromWithMemo` function.
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
     *     actions.token.transfer.call({
     *       to: '0x20c0...beef',
     *       amount: 100n,
     *       token: '0x20c0...babe',
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
            readonly name: "transfer";
            readonly inputs: readonly [{
                readonly name: "to";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "amount";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "bool";
                readonly internalType: "bool";
            }];
            readonly stateMutability: "nonpayable";
        } | {
            readonly type: "function";
            readonly name: "transferFrom";
            readonly inputs: readonly [{
                readonly name: "from";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "to";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "amount";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "bool";
                readonly internalType: "bool";
            }];
            readonly stateMutability: "nonpayable";
        } | {
            readonly type: "function";
            readonly name: "transferFromWithMemo";
            readonly inputs: readonly [{
                readonly name: "from";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "to";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "amount";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }, {
                readonly name: "memo";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
            readonly outputs: readonly [{
                readonly name: "";
                readonly type: "bool";
                readonly internalType: "bool";
            }];
            readonly stateMutability: "nonpayable";
        } | {
            readonly type: "function";
            readonly name: "transferWithMemo";
            readonly inputs: readonly [{
                readonly name: "to";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "amount";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }, {
                readonly name: "memo";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }];
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
        }];
        functionName: "transfer" | "transferFrom" | "transferFromWithMemo" | "transferWithMemo";
        args?: readonly [`0x${string}`, `0x${string}`, bigint, `0x${string}`] | readonly [`0x${string}`, bigint] | readonly [`0x${string}`, bigint, `0x${string}`] | readonly [`0x${string}`, `0x${string}`, bigint] | undefined;
    } & {
        args: import("viem").Widen<readonly [`0x${string}`, `0x${string}`, bigint, `0x${string}`] | readonly [`0x${string}`, bigint] | readonly [`0x${string}`, bigint, `0x${string}`] | readonly [`0x${string}`, `0x${string}`, bigint]>;
    } & {
        address: Address;
    } & {
        data: import("viem").Hex;
        to: Address;
    };
}
/**
 * Unpauses a TIP20 token.
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
 * const hash = await actions.token.unpause(client, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export declare function unpause<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: unpause.Parameters<chain, account>): Promise<unpause.ReturnType>;
export declare namespace unpause {
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = UnionOmit<WriteContractParameters<never, never, never, chain, account>, 'abi' | 'address' | 'functionName' | 'args'> & Args;
    type Args = {
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnType = WriteContractReturnType;
    /**
     * Defines a call to the `unpause` function.
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
     *     actions.token.unpause.call({
     *       token: '0x20c0...babe',
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
            readonly name: "unpause";
            readonly inputs: readonly [];
            readonly outputs: readonly [];
            readonly stateMutability: "nonpayable";
        }];
        functionName: "unpause";
        args?: readonly [] | undefined;
    } & {
        address: Address;
    } & {
        data: import("viem").Hex;
        to: Address;
    };
}
/**
 * Watches for TIP20 token approval events.
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
 * const unwatch = actions.token.watchApprove(client, {
 *   onApproval: (args, log) => {
 *     console.log('Approval:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export declare function watchApprove<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchApprove.Parameters): import("viem").WatchContractEventReturnType;
export declare namespace watchApprove {
    type Args = GetEventArgs<typeof tip20Abi, 'Approval', {
        IndexedOnly: false;
        Required: true;
    }>;
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof tip20Abi, 'Approval'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof tip20Abi, 'Approval', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Callback to invoke when tokens are approved. */
        onApproval: (args: Args, log: Log) => void;
        /** Address or ID of the TIP20 token. @default `usdAddress` */
        token?: TokenId.TokenIdOrAddress | undefined;
    };
}
/**
 * Watches for TIP20 token burn events.
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
 * const unwatch = actions.token.watchBurn(client, {
 *   onBurn: (args, log) => {
 *     console.log('Burn:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export declare function watchBurn<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchBurn.Parameters): import("viem").WatchContractEventReturnType;
export declare namespace watchBurn {
    type Args = GetEventArgs<typeof tip20Abi, 'Burn', {
        IndexedOnly: false;
        Required: true;
    }>;
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof tip20Abi, 'Burn'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof tip20Abi, 'Burn', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Callback to invoke when tokens are burned. */
        onBurn: (args: Args, log: Log) => void;
        /** Address or ID of the TIP20 token. @default `usdAddress` */
        token?: TokenId.TokenIdOrAddress | undefined;
    };
}
/**
 * Watches for new TIP20 tokens created.
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
 * const unwatch = actions.token.watchCreate(client, {
 *   onTokenCreated: (args, log) => {
 *     console.log('Token created:', args)
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
    type Args = GetEventArgs<typeof tip20FactoryAbi, 'TokenCreated', {
        IndexedOnly: false;
        Required: true;
    }>;
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof tip20FactoryAbi, 'TokenCreated'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof tip20FactoryAbi, 'TokenCreated', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Callback to invoke when a new TIP20 token is created. */
        onTokenCreated: (args: Args, log: Log) => void;
    };
}
/**
 * Watches for TIP20 token mint events.
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
 * const unwatch = actions.token.watchMint(client, {
 *   onMint: (args, log) => {
 *     console.log('Mint:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export declare function watchMint<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchMint.Parameters): import("viem").WatchContractEventReturnType;
export declare namespace watchMint {
    type Args = GetEventArgs<typeof tip20Abi, 'Mint', {
        IndexedOnly: false;
        Required: true;
    }>;
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof tip20Abi, 'Mint'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof tip20Abi, 'Mint', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Callback to invoke when tokens are minted. */
        onMint: (args: Args, log: Log) => void;
        /** Address or ID of the TIP20 token. @default `usdAddress` */
        token?: TokenId.TokenIdOrAddress | undefined;
    };
}
/**
 * Watches for TIP20 token role admin updates.
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
 * const unwatch = actions.token.watchAdminRole(client, {
 *   onRoleAdminUpdated: (args, log) => {
 *     console.log('Role admin updated:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export declare function watchAdminRole<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchAdminRole.Parameters): import("viem").WatchContractEventReturnType;
export declare namespace watchAdminRole {
    type Args = GetEventArgs<typeof tip20Abi, 'RoleAdminUpdated', {
        IndexedOnly: false;
        Required: true;
    }>;
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof tip20Abi, 'RoleAdminUpdated'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof tip20Abi, 'RoleAdminUpdated', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Callback to invoke when a role admin is updated. */
        onRoleAdminUpdated: (args: Args, log: Log) => void;
        /** Address or ID of the TIP20 token. @default `usdAddress` */
        token?: TokenId.TokenIdOrAddress | undefined;
    };
}
/**
 * Watches for TIP20 token role membership updates.
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
 * const unwatch = actions.token.watchRole(client, {
 *   onRoleUpdated: (args, log) => {
 *     console.log('Role updated:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export declare function watchRole<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchRole.Parameters): import("viem").WatchContractEventReturnType;
export declare namespace watchRole {
    type Args = GetEventArgs<typeof tip20Abi, 'RoleMembershipUpdated', {
        IndexedOnly: false;
        Required: true;
    }> & {
        /** Type of role update. */
        type: 'granted' | 'revoked';
    };
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof tip20Abi, 'RoleMembershipUpdated'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof tip20Abi, 'RoleMembershipUpdated', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Callback to invoke when a role membership is updated. */
        onRoleUpdated: (args: Args, log: Log) => void;
        /** Address or ID of the TIP20 token. @default `usdAddress` */
        token?: TokenId.TokenIdOrAddress | undefined;
    };
}
/**
 * Watches for TIP20 token transfer events.
 *
 * @example
 * ```ts
 * import { createClient, http } from 'viem'
 * import { tempo } from 'tempo/chains'
 * import * as actions from 'tempo/viem/actions'
 *
 * const client = createClient({
 *   account: privateKeyToAccount('0x...'),
 *   chain: tempo,
 *   transport: http(),
 * })
 *
 * const unwatch = actions.token.watchTransfer(client, {
 *   onTransfer: (args, log) => {
 *     console.log('Transfer:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export declare function watchTransfer<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: watchTransfer.Parameters): import("viem").WatchContractEventReturnType;
export declare namespace watchTransfer {
    type Args = GetEventArgs<typeof tip20Abi, 'Transfer', {
        IndexedOnly: false;
        Required: true;
    }>;
    type Log = viem_Log<bigint, number, false, ExtractAbiItem<typeof tip20Abi, 'Transfer'>, true>;
    type Parameters = UnionOmit<WatchContractEventParameters<typeof tip20Abi, 'Transfer', true>, 'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'> & {
        /** Callback to invoke when tokens are transferred. */
        onTransfer: (args: Args, log: Log) => void;
        /** Address or ID of the TIP20 token. @default `usdAddress` */
        token?: TokenId.TokenIdOrAddress | undefined;
    };
}
export {};
//# sourceMappingURL=token.d.ts.map