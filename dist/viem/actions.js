import { hexToBigInt, } from 'viem';
import { parseAccount } from 'viem/accounts';
import { multicall, readContract, simulateContract, writeContract, } from 'viem/actions';
import * as TokenId from "../ox/TokenId.js";
import * as TokenRole from "../ox/TokenRole.js";
import { feeManagerAbi, tip20Abi, tip20FactoryAbi } from "./abis.js";
import { feeManagerAddress, tip20FactoryAddress, usdAddress, } from "./addresses.js";
const transferPolicy = {
    0: 'always-reject',
    1: 'always-allow',
};
/**
 * Creates a new TIP20 token.
 *
 * @example
 * TODO
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function createToken(client, parameters) {
    const { account = client.account, admin: admin_ = client.account, chain = client.chain, name, symbol, currency, } = parameters;
    const admin = admin_ ? parseAccount(admin_) : undefined;
    if (!admin)
        throw new Error('admin is required.');
    const { request, result } = await simulateContract(client, {
        ...parameters,
        account,
        address: tip20FactoryAddress,
        abi: tip20FactoryAbi,
        chain,
        functionName: 'createToken',
        args: [name, symbol, currency, admin.address],
    });
    const hash = await writeContract(client, request);
    const id = hexToBigInt(result);
    const address = TokenId.toAddress(id);
    return {
        address,
        admin: admin.address,
        hash,
        id,
    };
}
/**
 * Gets TIP20 token allowance.
 *
 * @example
 * TODO
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The token allowance.
 */
export async function getTokenAllowance(client, parameters) {
    const { account = client.account, token = usdAddress, spender } = parameters;
    const address = account ? parseAccount(account).address : undefined;
    if (!address)
        throw new Error('account is required.');
    return readContract(client, {
        ...parameters,
        address: TokenId.toAddress(token),
        abi: tip20Abi,
        functionName: 'allowance',
        args: [address, spender],
    });
}
/**
 * Gets TIP20 token balance for an address.
 *
 * @example
 * TODO
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The token balance.
 */
export async function getTokenBalance(client, ...parameters) {
    const { account = client.account, token = usdAddress } = parameters[0] ?? {};
    const address = account ? parseAccount(account).address : undefined;
    if (!address)
        throw new Error('account is required.');
    return readContract(client, {
        ...parameters,
        address: TokenId.toAddress(token),
        abi: tip20Abi,
        functionName: 'balanceOf',
        args: [address],
    });
}
/**
 * Gets TIP20 token metadata including name, symbol, currency, decimals, and total supply.
 *
 * @example
 * TODO
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The token metadata.
 */
export async function getTokenMetadata(client, parameters = {}) {
    const { token = usdAddress, ...rest } = parameters;
    const address = TokenId.toAddress(token);
    const abi = tip20Abi;
    return multicall(client, {
        ...rest,
        contracts: [
            {
                address,
                abi,
                functionName: 'currency',
            },
            {
                address,
                abi,
                functionName: 'decimals',
            },
            {
                address,
                abi,
                functionName: 'name',
            },
            {
                address,
                abi,
                functionName: 'paused',
            },
            {
                address,
                abi,
                functionName: 'supplyCap',
            },
            {
                address,
                abi,
                functionName: 'symbol',
            },
            {
                address,
                abi,
                functionName: 'totalSupply',
            },
            {
                address,
                abi,
                functionName: 'transferPolicyId',
            },
        ],
        allowFailure: false,
        deployless: true,
    }).then(([currency, decimals, name, paused, supplyCap, symbol, totalSupply, transferPolicyId,]) => ({
        name,
        symbol,
        currency,
        decimals,
        totalSupply,
        paused,
        supplyCap,
        transferPolicy: transferPolicy[Number(transferPolicyId)],
    }));
}
/**
 * Gets the user's default fee token.
 *
 * @example
 * TODO
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function getUserToken(client, ...parameters) {
    const { account: account_ = client.account } = parameters[0] ?? {};
    if (!account_)
        throw new Error('account is required.');
    const account = parseAccount(account_);
    const address = await readContract(client, {
        ...parameters,
        address: feeManagerAddress,
        abi: feeManagerAbi,
        functionName: 'userTokens',
        args: [account.address],
    });
    return {
        address,
        id: TokenId.fromAddress(address),
    };
}
/**
 * Grants a role for a TIP20 token.
 *
 * @example
 * TODO
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function grantTokenRole(client, parameters) {
    const { account = client.account, chain = client.chain, token, to, } = parameters;
    const role = TokenRole.serialize(parameters.role);
    return writeContract(client, {
        ...parameters,
        account,
        address: TokenId.toAddress(token),
        abi: tip20Abi,
        chain,
        functionName: 'grantRole',
        args: [role, to],
    });
}
/**
 * Renounces a role for a TIP20 token.
 *
 * @example
 * TODO
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function renounceTokenRole(client, parameters) {
    const { account = client.account, chain = client.chain, token } = parameters;
    const role = TokenRole.serialize(parameters.role);
    return writeContract(client, {
        ...parameters,
        account,
        address: TokenId.toAddress(token),
        abi: tip20Abi,
        chain,
        functionName: 'renounceRole',
        args: [role],
    });
}
/**
 * Revokes a role for a TIP20 token.
 *
 * @example
 * TODO
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function revokeTokenRole(client, parameters) {
    const { account = client.account, chain = client.chain, token, from, } = parameters;
    const role = TokenRole.serialize(parameters.role);
    return writeContract(client, {
        ...parameters,
        account,
        address: TokenId.toAddress(token),
        abi: tip20Abi,
        chain,
        functionName: 'revokeRole',
        args: [role, from],
    });
}
/**
 * Sets the user's default fee token.
 *
 * @example
 * TODO
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function setUserToken(client, parameters) {
    const { account = client.account, chain = client.chain, token } = parameters;
    return writeContract(client, {
        ...parameters,
        account,
        address: feeManagerAddress,
        abi: feeManagerAbi,
        chain,
        functionName: 'setUserToken',
        // TODO: remove once eth_estimateGas is fixed
        gas: 30000n,
        args: [TokenId.toAddress(token)],
    });
}
export function decorator() {
    return (client) => {
        return {
            createToken: (parameters) => createToken(client, parameters),
            getTokenAllowance: (parameters) => getTokenAllowance(client, parameters),
            // @ts-expect-error
            getTokenBalance: (parameters) => getTokenBalance(client, parameters),
            getTokenMetadata: (parameters) => getTokenMetadata(client, parameters),
            // @ts-expect-error
            getUserToken: (parameters) => getUserToken(client, parameters),
            grantTokenRole: (parameters) => grantTokenRole(client, parameters),
            renounceTokenRole: (parameters) => renounceTokenRole(client, parameters),
            revokeTokenRole: (parameters) => revokeTokenRole(client, parameters),
            setUserToken: (parameters) => setUserToken(client, parameters),
        };
    };
}
//# sourceMappingURL=actions.js.map