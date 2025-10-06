import { parseAccount } from 'viem/accounts';
import { readContract, simulateContract, watchContractEvent, writeContract, } from 'viem/actions';
import { tip403RegistryAbi } from "../abis.js";
import { tip403RegistryAddress } from "../addresses.js";
import { defineCall } from "../utils.js";
const policyTypeMap = {
    whitelist: 0,
    blacklist: 1,
};
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
export async function create(client, parameters) {
    const { account = client.account, addresses, chain = client.chain, type, ...rest } = parameters;
    if (!account)
        throw new Error('`account` is required');
    const admin = parseAccount(account).address;
    const call = create.call({ admin, type, addresses });
    const { request, result } = await simulateContract(client, {
        ...rest,
        account,
        chain,
        ...call,
    });
    const hash = await writeContract(client, request);
    return { hash, policyId: result };
}
(function (create) {
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
    function call(args) {
        const { admin, type, addresses } = args;
        const callArgs = addresses
            ? [admin, policyTypeMap[type], addresses]
            : [admin, policyTypeMap[type]];
        return defineCall({
            address: tip403RegistryAddress,
            abi: tip403RegistryAbi,
            functionName: 'createPolicy',
            args: callArgs,
        });
    }
    create.call = call;
})(create || (create = {}));
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
export async function setAdmin(client, parameters) {
    const call = setAdmin.call(parameters);
    return writeContract(client, {
        ...parameters,
        ...call,
    });
}
(function (setAdmin) {
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
    function call(args) {
        const { policyId, admin } = args;
        return defineCall({
            address: tip403RegistryAddress,
            abi: tip403RegistryAbi,
            functionName: 'setPolicyAdmin',
            args: [policyId, admin],
        });
    }
    setAdmin.call = call;
})(setAdmin || (setAdmin = {}));
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
export async function modifyWhitelist(client, parameters) {
    const { address: targetAccount, ...rest } = parameters;
    const call = modifyWhitelist.call({ ...rest, address: targetAccount });
    return writeContract(client, {
        ...parameters,
        ...call,
    });
}
(function (modifyWhitelist) {
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
    function call(args) {
        const { policyId, address, allowed } = args;
        return defineCall({
            address: tip403RegistryAddress,
            abi: tip403RegistryAbi,
            functionName: 'modifyPolicyWhitelist',
            args: [policyId, address, allowed],
        });
    }
    modifyWhitelist.call = call;
})(modifyWhitelist || (modifyWhitelist = {}));
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
export async function modifyBlacklist(client, parameters) {
    const { address: targetAccount, ...rest } = parameters;
    const call = modifyBlacklist.call({ ...rest, address: targetAccount });
    return writeContract(client, {
        ...parameters,
        ...call,
    });
}
(function (modifyBlacklist) {
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
    function call(args) {
        const { policyId, address, restricted } = args;
        return defineCall({
            address: tip403RegistryAddress,
            abi: tip403RegistryAbi,
            functionName: 'modifyPolicyBlacklist',
            args: [policyId, address, restricted],
        });
    }
    modifyBlacklist.call = call;
})(modifyBlacklist || (modifyBlacklist = {}));
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
export async function getData(client, parameters) {
    const result = await readContract(client, {
        ...parameters,
        ...getData.call(parameters),
    });
    return {
        admin: result[1],
        type: result[0] === 0 ? 'whitelist' : 'blacklist',
    };
}
(function (getData) {
    /**
     * Defines a call to the `policyData` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { policyId } = args;
        return defineCall({
            address: tip403RegistryAddress,
            abi: tip403RegistryAbi,
            args: [policyId],
            functionName: 'policyData',
        });
    }
    getData.call = call;
})(getData || (getData = {}));
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
export async function isAuthorized(client, parameters) {
    return readContract(client, {
        ...parameters,
        ...isAuthorized.call(parameters),
    });
}
(function (isAuthorized) {
    /**
     * Defines a call to the `isAuthorized` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { policyId, user } = args;
        return defineCall({
            address: tip403RegistryAddress,
            abi: tip403RegistryAbi,
            args: [policyId, user],
            functionName: 'isAuthorized',
        });
    }
    isAuthorized.call = call;
})(isAuthorized || (isAuthorized = {}));
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
export function watchCreate(client, parameters) {
    const { onPolicyCreated, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: tip403RegistryAddress,
        abi: tip403RegistryAbi,
        eventName: 'PolicyCreated',
        onLogs: (logs) => {
            for (const log of logs)
                onPolicyCreated({
                    ...log.args,
                    type: log.args.policyType === 0 ? 'whitelist' : 'blacklist',
                }, log);
        },
        strict: true,
    });
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
export function watchAdminUpdated(client, parameters) {
    const { onAdminUpdated, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: tip403RegistryAddress,
        abi: tip403RegistryAbi,
        eventName: 'PolicyAdminUpdated',
        onLogs: (logs) => {
            for (const log of logs)
                onAdminUpdated(log.args, log);
        },
        strict: true,
    });
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
export function watchWhitelistUpdated(client, parameters) {
    const { onWhitelistUpdated, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: tip403RegistryAddress,
        abi: tip403RegistryAbi,
        eventName: 'WhitelistUpdated',
        onLogs: (logs) => {
            for (const log of logs)
                onWhitelistUpdated(log.args, log);
        },
        strict: true,
    });
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
export function watchBlacklistUpdated(client, parameters) {
    const { onBlacklistUpdated, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: tip403RegistryAddress,
        abi: tip403RegistryAbi,
        eventName: 'BlacklistUpdated',
        onLogs: (logs) => {
            for (const log of logs)
                onBlacklistUpdated(log.args, log);
        },
        strict: true,
    });
}
//# sourceMappingURL=policy.js.map