import { readContract, watchContractEvent, writeContract } from 'viem/actions';
import * as TokenId from "../../ox/TokenId.js";
import { feeAmmAbi } from "../abis.js";
import { feeManagerAddress } from "../addresses.js";
import { defineCall } from "../utils.js";
/**
 * Gets the pool ID for a token pair.
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
 * const poolId = await actions.amm.getPoolId(client, {
 *   userToken: '0x...',
 *   validatorToken: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The pool ID.
 */
export async function getPoolId(client, parameters) {
    return readContract(client, {
        ...parameters,
        ...getPoolId.call(parameters),
    });
}
(function (getPoolId) {
    /**
     * Defines a call to the `getPoolId` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { userToken, validatorToken } = args;
        return defineCall({
            address: feeManagerAddress,
            abi: feeAmmAbi,
            args: [TokenId.toAddress(userToken), TokenId.toAddress(validatorToken)],
            functionName: 'getPoolId',
        });
    }
    getPoolId.call = call;
})(getPoolId || (getPoolId = {}));
/**
 * Gets the reserves for a liquidity pool.
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
 * const pool = await actions.amm.getPool(client, {
 *   userToken: '0x...',
 *   validatorToken: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The pool reserves.
 */
export async function getPool(client, parameters) {
    return readContract(client, {
        ...parameters,
        ...getPool.call(parameters),
    });
}
(function (getPool) {
    /**
     * Defines a call to the `getPool` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { userToken, validatorToken } = args;
        return defineCall({
            address: feeManagerAddress,
            abi: feeAmmAbi,
            args: [TokenId.toAddress(userToken), TokenId.toAddress(validatorToken)],
            functionName: 'getPool',
        });
    }
    getPool.call = call;
})(getPool || (getPool = {}));
/**
 * Gets the total supply of LP tokens for a pool.
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
 * const poolId = await actions.amm.getPoolId(client, {
 *   userToken: '0x...',
 *   validatorToken: '0x...',
 * })
 *
 * const totalSupply = await actions.amm.getTotalSupply(client, { poolId })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The total supply of LP tokens.
 */
export async function getTotalSupply(client, parameters) {
    return readContract(client, {
        ...parameters,
        ...getTotalSupply.call(parameters),
    });
}
(function (getTotalSupply) {
    /**
     * Defines a call to the `totalSupply` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { poolId } = args;
        return defineCall({
            address: feeManagerAddress,
            abi: feeAmmAbi,
            args: [poolId],
            functionName: 'totalSupply',
        });
    }
    getTotalSupply.call = call;
})(getTotalSupply || (getTotalSupply = {}));
/**
 * Gets the LP token balance for an account in a specific pool.
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
 * const poolId = await actions.amm.getPoolId(client, {
 *   userToken: '0x...',
 *   validatorToken: '0x...',
 * })
 *
 * const balance = await actions.amm.getLiquidityBalance(client, {
 *   poolId,
 *   address: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The LP token balance.
 */
export async function getLiquidityBalance(client, parameters) {
    return readContract(client, {
        ...parameters,
        ...getLiquidityBalance.call(parameters),
    });
}
(function (getLiquidityBalance) {
    /**
     * Defines a call to the `liquidityBalances` function.
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { address, poolId } = args;
        return defineCall({
            address: feeManagerAddress,
            abi: feeAmmAbi,
            args: [poolId, address],
            functionName: 'liquidityBalances',
        });
    }
    getLiquidityBalance.call = call;
})(getLiquidityBalance || (getLiquidityBalance = {}));
/**
 * Performs a rebalance swap from validator token to user token.
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
 * const hash = await actions.amm.rebalanceSwap(client, {
 *   userToken: '0x...',
 *   validatorToken: '0x...',
 *   amountOut: 100n,
 *   to: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function rebalanceSwap(client, parameters) {
    const call = rebalanceSwap.call(parameters);
    return writeContract(client, {
        ...parameters,
        ...call,
    });
}
(function (rebalanceSwap) {
    /**
     * Defines a call to the `rebalanceSwap` function.
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
     *     actions.amm.rebalanceSwap.call({
     *       userToken: '0x20c0...beef',
     *       validatorToken: '0x20c0...babe',
     *       amountOut: 100n,
     *       to: '0xfeed...fede',
     *     }),
     *     actions.amm.rebalanceSwap.call({
     *       userToken: '0x20c0...babe',
     *       validatorToken: '0x20c0...babe',
     *       amountOut: 100n,
     *       to: '0xfeed...fede',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { userToken, validatorToken, amountOut, to } = args;
        return defineCall({
            address: feeManagerAddress,
            abi: feeAmmAbi,
            functionName: 'rebalanceSwap',
            args: [
                TokenId.toAddress(userToken),
                TokenId.toAddress(validatorToken),
                amountOut,
                to,
            ],
        });
    }
    rebalanceSwap.call = call;
})(rebalanceSwap || (rebalanceSwap = {}));
/**
 * Adds liquidity to a pool.
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
 * const hash = await actions.amm.mint(client, {
 *   userToken: {
 *     address: '0x20c0...beef',
 *     amount: 100n,
 *   },
 *   validatorToken: {
 *     address: '0x20c0...babe',
 *     amount: 100n,
 *   },
 *   to: '0xfeed...fede',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function mint(client, parameters) {
    const call = mint.call(parameters);
    return writeContract(client, {
        ...parameters,
        ...call,
    });
}
(function (mint) {
    /**
     * Defines a call to the `mint` function.
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
     *     actions.amm.mint.call({
     *       userToken: {
     *         address: '0x20c0...beef',
     *         amount: 100n,
     *       },
     *       validatorToken: {
     *         address: '0x20c0...babe',
     *         amount: 100n,
     *       },
     *       to: '0xfeed...fede',
     *     }),
     *     actions.amm.mint.call({
     *       userToken: {
     *         address: '0x20c0...babe',
     *         amount: 100n,
     *       },
     *       validatorToken: {
     *         address: '0x20c0...babe',
     *         amount: 100n,
     *       },
     *       to: '0xfeed...fede',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { to, userToken, validatorToken } = args;
        return defineCall({
            address: feeManagerAddress,
            abi: feeAmmAbi,
            functionName: 'mint',
            args: [
                TokenId.toAddress(userToken.address),
                TokenId.toAddress(validatorToken.address),
                userToken.amount,
                validatorToken.amount,
                to,
            ],
        });
    }
    mint.call = call;
})(mint || (mint = {}));
/**
 * Removes liquidity from a pool.
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
 * const hash = await actions.amm.burn(client, {
 *   userToken: '0x20c0...beef',
 *   validatorToken: '0x20c0...babe',
 *   liquidity: 50n,
 *   to: '0xfeed...fede',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function burn(client, parameters) {
    const call = burn.call(parameters);
    return writeContract(client, {
        ...parameters,
        ...call,
    });
}
(function (burn) {
    /**
     * Defines a call to the `burn` function.
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
     *     actions.amm.burn.call({
     *       liquidity: 100n,
     *       to: '0xfeed...fede',
     *       userToken: '0x20c0...beef',
     *       validatorToken: '0x20c0...babe',
     *     }),
     *     actions.amm.burn.call({
     *       liquidity: 100n,
     *       to: '0xfeed...fede',
     *       userToken: '0x20c0...babe',
     *       validatorToken: '0x20c0...babe',
     *     }),
     *   ]
     * })
     * ```
     *
     * @param args - Arguments.
     * @returns The call.
     */
    function call(args) {
        const { liquidity, to, userToken, validatorToken } = args;
        return defineCall({
            address: feeManagerAddress,
            abi: feeAmmAbi,
            functionName: 'burn',
            args: [
                TokenId.toAddress(userToken),
                TokenId.toAddress(validatorToken),
                liquidity,
                to,
            ],
        });
    }
    burn.call = call;
})(burn || (burn = {}));
/**
 * Watches for rebalance swap events.
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
 * const unwatch = actions.amm.watchRebalanceSwap(client, {
 *   onRebalanceSwap: (args, log) => {
 *     console.log('Rebalance swap:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchRebalanceSwap(client, parameters) {
    const { onRebalanceSwap, userToken, validatorToken, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: feeManagerAddress,
        abi: feeAmmAbi,
        eventName: 'RebalanceSwap',
        args: userToken !== undefined && validatorToken !== undefined
            ? {
                userToken: TokenId.toAddress(userToken),
                validatorToken: TokenId.toAddress(validatorToken),
            }
            : undefined,
        onLogs: (logs) => {
            for (const log of logs)
                onRebalanceSwap(log.args, log);
        },
        strict: true,
    });
}
/**
 * Watches for fee swap events.
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
 * const unwatch = actions.amm.watchFeeSwap(client, {
 *   onFeeSwap: (args, log) => {
 *     console.log('Fee swap:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchFeeSwap(client, parameters) {
    const { onFeeSwap, userToken, validatorToken, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: feeManagerAddress,
        abi: feeAmmAbi,
        eventName: 'FeeSwap',
        args: userToken !== undefined && validatorToken !== undefined
            ? {
                userToken: TokenId.toAddress(userToken),
                validatorToken: TokenId.toAddress(validatorToken),
            }
            : undefined,
        onLogs: (logs) => {
            for (const log of logs)
                onFeeSwap(log.args, log);
        },
        strict: true,
    });
}
/**
 * Watches for liquidity mint events.
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
 * const unwatch = actions.amm.watchMint(client, {
 *   onMint: (args, log) => {
 *     console.log('Liquidity added:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchMint(client, parameters) {
    const { onMint, sender, userToken, validatorToken, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: feeManagerAddress,
        abi: feeAmmAbi,
        eventName: 'Mint',
        args: {
            ...(sender !== undefined && {
                sender: TokenId.toAddress(sender),
            }),
            ...(userToken !== undefined && {
                userToken: TokenId.toAddress(userToken),
            }),
            ...(validatorToken !== undefined && {
                validatorToken: TokenId.toAddress(validatorToken),
            }),
        },
        onLogs: (logs) => {
            for (const log of logs)
                onMint({
                    liquidity: log.args.liquidity,
                    sender: log.args.sender,
                    userToken: {
                        address: log.args.userToken,
                        amount: log.args.amountUserToken,
                    },
                    validatorToken: {
                        address: log.args.validatorToken,
                        amount: log.args.amountValidatorToken,
                    },
                }, log);
        },
        strict: true,
    });
}
/**
 * Watches for liquidity burn events.
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
 * const unwatch = actions.amm.watchBurn(client, {
 *   onBurn: (args, log) => {
 *     console.log('Liquidity removed:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchBurn(client, parameters) {
    const { onBurn, userToken, validatorToken, ...rest } = parameters;
    return watchContractEvent(client, {
        ...rest,
        address: feeManagerAddress,
        abi: feeAmmAbi,
        eventName: 'Burn',
        args: userToken !== undefined && validatorToken !== undefined
            ? {
                userToken: TokenId.toAddress(userToken),
                validatorToken: TokenId.toAddress(validatorToken),
            }
            : undefined,
        onLogs: (logs) => {
            for (const log of logs)
                onBurn(log.args, log);
        },
        strict: true,
    });
}
//# sourceMappingURL=amm.js.map