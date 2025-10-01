// TODO:
// - add `.call` to namespaces
// - add `.simulate` to namespaces
// - add `.estimateGas` to namespaces

import type {
  Account,
  Address,
  Chain,
  Client,
  ExtractAbiItem,
  GetEventArgs,
  ReadContractParameters,
  Transport,
  Log as viem_Log,
  WatchContractEventParameters,
  WriteContractParameters,
  WriteContractReturnType,
} from 'viem'
import { parseAccount } from 'viem/accounts'
import { readContract, watchContractEvent, writeContract } from 'viem/actions'
import type { UnionOmit } from '../../internal/types.js'
import * as TokenId from '../../ox/TokenId.js'
import { feeManagerAbi } from '../abis.js'
import { feeManagerAddress } from '../addresses.js'
import type { GetAccountParameter } from '../types.js'

/**
 * Gets the user's default fee token.
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
 * const { address, id } = await actions.fee.getUserToken(client)
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function getUserToken<
  chain extends Chain | undefined,
  account extends Account | undefined,
>(
  client: Client<Transport, chain, account>,
  ...parameters: account extends Account
    ? [getUserToken.Parameters<account>] | []
    : [getUserToken.Parameters<account>]
): Promise<getUserToken.ReturnType> {
  const { account: account_ = client.account, ...rest } = parameters[0] ?? {}
  if (!account_) throw new Error('account is required.')
  const account = parseAccount(account_)
  const address = await readContract(client, {
    ...rest,
    address: feeManagerAddress,
    abi: feeManagerAbi,
    functionName: 'userTokens',
    args: [account.address],
  })
  return {
    address,
    id: TokenId.fromAddress(address),
  }
}

export namespace getUserToken {
  export type Parameters<
    account extends Account | undefined = Account | undefined,
  > = UnionOmit<
    ReadContractParameters<never, never, never>,
    'abi' | 'address' | 'functionName' | 'args'
  > &
    GetAccountParameter<account>

  export type ReturnType = {
    address: Address
    id: bigint
  }
}

/**
 * Sets the user's default fee token.
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
 * const hash = await actions.fee.setUserToken(client, {
 *   token: '0x...',
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function setUserToken<
  chain extends Chain | undefined,
  account extends Account | undefined,
>(
  client: Client<Transport, chain, account>,
  parameters: setUserToken.Parameters<chain, account>,
): Promise<setUserToken.ReturnType> {
  const {
    account = client.account,
    chain = client.chain,
    token,
    ...rest
  } = parameters
  return writeContract(client, {
    ...rest,
    account,
    address: feeManagerAddress,
    abi: feeManagerAbi,
    chain,
    functionName: 'setUserToken',
    args: [TokenId.toAddress(token)],
  } as never)
}

export namespace setUserToken {
  export type Parameters<
    chain extends Chain | undefined = Chain | undefined,
    account extends Account | undefined = Account | undefined,
  > = UnionOmit<
    WriteContractParameters<never, never, never, chain, account>,
    'abi' | 'address' | 'functionName' | 'args'
  > & {
    /** Address or ID of the TIP20 token. */
    token: TokenId.TokenIdOrAddress
  }

  export type ReturnType = WriteContractReturnType
}

/**
 * Watches for user token set events.
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
 * const unwatch = actions.fee.watchSetUserToken(client, {
 *   onUserTokenSet: (args, log) => {
 *     console.log('User token set:', args)
 *   },
 * })
 * ```
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns A function to unsubscribe from the event.
 */
export function watchSetUserToken<
  chain extends Chain | undefined,
  account extends Account | undefined,
>(
  client: Client<Transport, chain, account>,
  parameters: watchSetUserToken.Parameters,
) {
  const { onUserTokenSet, ...rest } = parameters
  return watchContractEvent(client, {
    ...rest,
    address: feeManagerAddress,
    abi: feeManagerAbi,
    eventName: 'UserTokenSet',
    onLogs: (logs) => {
      for (const log of logs) onUserTokenSet(log.args, log)
    },
    strict: true,
  })
}

export namespace watchSetUserToken {
  export type Args = GetEventArgs<
    typeof feeManagerAbi,
    'UserTokenSet',
    { IndexedOnly: false; Required: true }
  >

  export type Log = viem_Log<
    bigint,
    number,
    false,
    ExtractAbiItem<typeof feeManagerAbi, 'UserTokenSet'>,
    true
  >

  export type Parameters = UnionOmit<
    WatchContractEventParameters<typeof feeManagerAbi, 'UserTokenSet', true>,
    'abi' | 'address' | 'batch' | 'eventName' | 'onLogs' | 'strict'
  > & {
    /** Callback to invoke when a user token is set. */
    onUserTokenSet: (args: Args, log: Log) => void
  }
}
