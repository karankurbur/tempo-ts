import {
  type Account,
  type Address,
  type Chain,
  type ClientConfig,
  createClient,
  http,
  type RpcSchema,
  type Transport,
} from 'viem'
import { tempo } from '../chains.js'
import type { PartialBy } from '../internal/types.js'
import * as actions from './actions.js'

/**
 * Instantiates a default Tempo client.
 *
 * @example
 * TODO
 *
 * @param parameters - The parameters for the client.
 * @returns A Tempo client.
 */
export function createTempoClient<
  transport extends Transport,
  chain extends Chain | undefined = typeof tempo,
  accountOrAddress extends Account | Address | undefined = undefined,
  rpcSchema extends RpcSchema | undefined = undefined,
>(
  parameters: createTempoClient.Parameters<
    transport,
    chain,
    accountOrAddress,
    rpcSchema
  > = {},
) {
  const { chain = tempo, transport = http(), ...rest } = parameters
  return createClient({
    ...rest,
    chain,
    transport,
  }).extend(actions.decorator())
}

export namespace createTempoClient {
  export type Parameters<
    transport extends Transport = Transport,
    chain extends Chain | undefined = Chain | undefined,
    accountOrAddress extends Account | Address | undefined =
      | Account
      | Address
      | undefined,
    rpcSchema extends RpcSchema | undefined = undefined,
  > = PartialBy<
    ClientConfig<transport, chain, accountOrAddress, rpcSchema>,
    'transport'
  >
}
