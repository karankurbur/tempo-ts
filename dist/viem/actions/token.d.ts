import * as Hex from 'ox/Hex';
import * as Signature from 'ox/Signature';
import type { Account, Address, Chain, Client, ExtractAbiItem, GetEventArgs, ReadContractParameters, ReadContractReturnType, Transport, ValueOf, Log as viem_Log, WatchContractEventParameters, WriteContractParameters, WriteContractReturnType } from 'viem';
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
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = UnionOmit<WriteContractParameters<never, never, never, chain, account>, 'abi' | 'address' | 'functionName' | 'args'> & {
        /** Amount of tokens to approve. */
        amount: bigint;
        /** Address of the spender. */
        spender: Address;
        /** Address or ID of the TIP20 token. @default `usdAddress` */
        token?: TokenId.TokenIdOrAddress | undefined;
    };
    type ReturnType = WriteContractReturnType;
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
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = UnionOmit<WriteContractParameters<never, never, never, chain, account>, 'abi' | 'address' | 'functionName' | 'args'> & {
        /** Amount of tokens to burn. */
        amount: bigint;
        /** Address to burn tokens from. */
        from: Address;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnType = WriteContractReturnType;
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
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = UnionOmit<WriteContractParameters<never, never, never, chain, account>, 'abi' | 'address' | 'functionName' | 'args'> & {
        /** Amount of tokens to burn. */
        amount: bigint;
        /** Memo to include in the transfer. */
        memo?: Hex.Hex | undefined;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnType = WriteContractReturnType;
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
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = UnionOmit<WriteContractParameters<never, never, never, chain, account>, 'abi' | 'address' | 'functionName' | 'args'> & {
        /** New transfer policy ID. */
        policyId: bigint;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnType = WriteContractReturnType;
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
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = UnionOmit<WriteContractParameters<never, never, never, chain, account>, 'abi' | 'address' | 'functionName' | 'args'> & {
        currency: string;
        name: string;
        symbol: string;
    } & (account extends Account ? {
        admin?: Account | Address | undefined;
    } : {
        admin: Account | Address;
    });
    type ReturnType = {
        /** Address of the created TIP20 token. */
        address: Address;
        /** Admin of the token. */
        admin: Address;
        /** Transaction hash. */
        hash: Hex.Hex;
        /** ID of the TIP20 token. */
        id: bigint;
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
    type Parameters<account extends Account | undefined = Account | undefined> = UnionOmit<ReadContractParameters<never, never, never>, 'abi' | 'address' | 'functionName' | 'args'> & GetAccountParameter<account> & {
        /** Address or ID of the TIP20 token. @default `usdAddress` */
        token?: TokenId.TokenIdOrAddress | undefined;
        /** Address of the spender. */
        spender: Address;
    };
    type ReturnType = ReadContractReturnType<typeof tip20Abi, 'allowance', never>;
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
    type Parameters<account extends Account | undefined = Account | undefined> = UnionOmit<ReadContractParameters<never, never, never>, 'abi' | 'address' | 'functionName' | 'args'> & GetAccountParameter<account> & {
        /** Address or ID of the TIP20 token. @default `usdAddress` */
        token?: TokenId.TokenIdOrAddress | undefined;
    };
    type ReturnType = ReadContractReturnType<typeof tip20Abi, 'balanceOf', never>;
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
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = UnionOmit<WriteContractParameters<never, never, never, chain, account>, 'abi' | 'address' | 'functionName' | 'args'> & {
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
        /** Role to grant. */
        roles: readonly TokenRole.TokenRole[];
        /** Address to grant the role to. */
        to: Address;
    };
    type ReturnType = WriteContractReturnType;
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
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = UnionOmit<WriteContractParameters<never, never, never, chain, account>, 'abi' | 'address' | 'functionName' | 'args'> & {
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
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = UnionOmit<WriteContractParameters<never, never, never, chain, account>, 'abi' | 'address' | 'functionName' | 'args'> & {
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnType = WriteContractReturnType;
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
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = UnionOmit<WriteContractParameters<never, never, never, chain, account>, 'abi' | 'address' | 'functionName' | 'args'> & {
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
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = UnionOmit<WriteContractParameters<never, never, never, chain, account>, 'abi' | 'address' | 'functionName' | 'args'> & {
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
        /** Roles to renounce. */
        roles: readonly TokenRole.TokenRole[];
    };
    type ReturnType = WriteContractReturnType;
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
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = UnionOmit<WriteContractParameters<never, never, never, chain, account>, 'abi' | 'address' | 'functionName' | 'args'> & {
        /** Address to revoke the role from. */
        from: Address;
        /** Role to revoke. */
        roles: readonly TokenRole.TokenRole[];
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnType = WriteContractReturnType;
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
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = UnionOmit<WriteContractParameters<never, never, never, chain, account>, 'abi' | 'address' | 'functionName' | 'args'> & {
        /** New supply cap. */
        supplyCap: bigint;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnType = WriteContractReturnType;
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
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = UnionOmit<WriteContractParameters<never, never, never, chain, account>, 'abi' | 'address' | 'functionName' | 'args'> & {
        /** New admin role. */
        adminRole: TokenRole.TokenRole;
        /** Role to set admin for. */
        role: TokenRole.TokenRole;
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnType = WriteContractReturnType;
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
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = UnionOmit<WriteContractParameters<never, never, never, chain, account>, 'abi' | 'address' | 'functionName' | 'args'> & {
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
    type Parameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined> = UnionOmit<WriteContractParameters<never, never, never, chain, account>, 'abi' | 'address' | 'functionName' | 'args'> & {
        /** Address or ID of the TIP20 token. */
        token: TokenId.TokenIdOrAddress;
    };
    type ReturnType = WriteContractReturnType;
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