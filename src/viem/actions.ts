import {
  type Account,
  type Address,
  type Chain,
  type Client,
  type Hex,
  hexToBigInt,
  type ReadContractParameters,
  type ReadContractReturnType,
  type Transport,
  type ValueOf,
  type WriteContractParameters,
  type WriteContractReturnType,
} from 'viem'
import { parseAccount } from 'viem/accounts'
import {
  multicall,
  readContract,
  simulateContract,
  writeContract,
} from 'viem/actions'
import type { Compute, UnionOmit } from '../internal/types.js'
import * as TokenId from '../ox/TokenId.js'
import * as TokenRole from '../ox/TokenRole.js'
import { feeManagerAbi, tip20Abi, tip20FactoryAbi } from './abis.js'
import {
  feeManagerAddress,
  tip20FactoryAddress,
  usdAddress,
} from './addresses.js'
import type { GetAccountParameter } from './types.js'

const transferPolicy = {
  0: 'always-reject',
  1: 'always-allow',
} as const
type TransferPolicy = ValueOf<typeof transferPolicy>

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
export async function createToken<
  chain extends Chain | undefined,
  account extends Account | undefined,
>(
  client: Client<Transport, chain, account>,
  parameters: createToken.Parameters<chain, account>,
): Promise<createToken.ReturnType> {
  const {
    account = client.account,
    admin: admin_ = client.account,
    chain = client.chain,
    name,
    symbol,
    currency,
  } = parameters
  const admin = admin_ ? parseAccount(admin_) : undefined
  if (!admin) throw new Error('admin is required.')
  const { request, result } = await simulateContract(client, {
    ...parameters,
    account,
    address: tip20FactoryAddress,
    abi: tip20FactoryAbi,
    chain,
    functionName: 'createToken',
    args: [name, symbol, currency, admin.address],
  } as never)
  const hash = await writeContract(client as never, request as never)
  const id = hexToBigInt(result as Hex)
  const address = TokenId.toAddress(id)
  return {
    address,
    admin: admin.address,
    hash,
    id,
  }
}

export namespace createToken {
  export type Parameters<
    chain extends Chain | undefined = Chain | undefined,
    account extends Account | undefined = Account | undefined,
  > = UnionOmit<
    WriteContractParameters<never, never, never, chain, account>,
    'abi' | 'address' | 'functionName' | 'args'
  > & {
    currency: string
    name: string
    symbol: string
  } & (account extends Account
      ? { admin?: Account | Address | undefined }
      : { admin: Account | Address })

  export type ReturnType = {
    /** Address of the created TIP20 token. */
    address: Address
    /** Admin of the token. */
    admin: Address
    /** Transaction hash. */
    hash: Hex
    /** ID of the TIP20 token. */
    id: bigint
  }
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
export async function getTokenAllowance<
  chain extends Chain | undefined,
  account extends Account | undefined,
>(
  client: Client<Transport, chain, account>,
  parameters: getTokenAllowance.Parameters<account>,
): Promise<getTokenAllowance.ReturnType> {
  const { account = client.account, token = usdAddress, spender } = parameters
  const address = account ? parseAccount(account).address : undefined
  if (!address) throw new Error('account is required.')
  return readContract(client, {
    ...parameters,
    address: TokenId.toAddress(token),
    abi: tip20Abi,
    functionName: 'allowance',
    args: [address, spender],
  })
}

export namespace getTokenAllowance {
  export type Parameters<
    account extends Account | undefined = Account | undefined,
  > = UnionOmit<
    ReadContractParameters<never, never, never>,
    'abi' | 'address' | 'functionName' | 'args'
  > &
    GetAccountParameter<account> & {
      /** Address or ID of the TIP20 token. */
      token?: TokenId.TokenIdOrAddress | undefined
      /** Address of the spender. */
      spender: Address
    }

  export type ReturnType = ReadContractReturnType<
    typeof tip20Abi,
    'allowance',
    never
  >
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
export async function getTokenBalance<
  chain extends Chain | undefined,
  account extends Account | undefined,
>(
  client: Client<Transport, chain, account>,
  ...parameters: account extends Account
    ? [getTokenBalance.Parameters<account>] | []
    : [getTokenBalance.Parameters<account>]
): Promise<getTokenBalance.ReturnType> {
  const { account = client.account, token = usdAddress } = parameters[0] ?? {}
  const address = account ? parseAccount(account).address : undefined
  if (!address) throw new Error('account is required.')
  return readContract(client, {
    ...parameters,
    address: TokenId.toAddress(token),
    abi: tip20Abi,
    functionName: 'balanceOf',
    args: [address],
  })
}

export namespace getTokenBalance {
  export type Parameters<
    account extends Account | undefined = Account | undefined,
  > = UnionOmit<
    ReadContractParameters<never, never, never>,
    'abi' | 'address' | 'functionName' | 'args'
  > &
    GetAccountParameter<account> & {
      /** Address or ID of the TIP20 token. */
      token?: TokenId.TokenIdOrAddress | undefined
    }

  export type ReturnType = ReadContractReturnType<
    typeof tip20Abi,
    'balanceOf',
    never
  >
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
export async function getTokenMetadata<chain extends Chain | undefined>(
  client: Client<Transport, chain>,
  parameters: getTokenMetadata.Parameters = {},
): Promise<getTokenMetadata.ReturnType> {
  const { token = usdAddress, ...rest } = parameters
  const address = TokenId.toAddress(token)
  const abi = tip20Abi
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
    ] as const,
    allowFailure: false,
    deployless: true,
  }).then(
    ([
      currency,
      decimals,
      name,
      paused,
      supplyCap,
      symbol,
      totalSupply,
      transferPolicyId,
    ]) => ({
      name,
      symbol,
      currency,
      decimals,
      totalSupply,
      paused,
      supplyCap,
      transferPolicy:
        transferPolicy[Number(transferPolicyId) as keyof typeof transferPolicy],
    }),
  )
}

export namespace getTokenMetadata {
  export type Parameters = {
    /** Address or ID of the TIP20 token. */
    token?: TokenId.TokenIdOrAddress | undefined
  }

  export type ReturnType = Compute<{
    /** Currency (e.g. "USD"). */
    currency: string
    /** Decimals. */
    decimals: number
    /** Name. */
    name: string
    /** Whether the token is paused. */
    paused: boolean
    /** Supply cap. */
    supplyCap: bigint
    /** Symbol. */
    symbol: string
    /** Total supply. */
    totalSupply: bigint
    /** Transfer policy. */
    transferPolicy: TransferPolicy
  }>
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
export async function getUserToken<
  chain extends Chain | undefined,
  account extends Account | undefined,
>(
  client: Client<Transport, chain, account>,
  ...parameters: account extends Account
    ? [getUserToken.Parameters<account>] | []
    : [getUserToken.Parameters<account>]
): Promise<getUserToken.ReturnType> {
  const { account: account_ = client.account } = parameters[0] ?? {}
  if (!account_) throw new Error('account is required.')
  const account = parseAccount(account_)
  const address = await readContract(client, {
    ...parameters,
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
 * Grants a role for a TIP20 token.
 *
 * @example
 * TODO
 *
 * @param client - Client.
 * @param parameters - Parameters.
 * @returns The transaction hash.
 */
export async function grantTokenRole<
  chain extends Chain | undefined,
  account extends Account | undefined,
>(
  client: Client<Transport, chain, account>,
  parameters: grantTokenRole.Parameters<chain, account>,
): Promise<grantTokenRole.ReturnType> {
  const {
    account = client.account,
    chain = client.chain,
    token,
    to,
  } = parameters
  const role = TokenRole.serialize(parameters.role)
  return writeContract(client, {
    ...parameters,
    account,
    address: TokenId.toAddress(token),
    abi: tip20Abi,
    chain,
    functionName: 'grantRole',
    args: [role, to],
  } as never)
}

export namespace grantTokenRole {
  export type Parameters<
    chain extends Chain | undefined = Chain | undefined,
    account extends Account | undefined = Account | undefined,
  > = UnionOmit<
    WriteContractParameters<never, never, never, chain, account>,
    'abi' | 'address' | 'functionName' | 'args'
  > & {
    /** Address or ID of the TIP20 token. */
    token: TokenId.TokenIdOrAddress
    /** Role to grant. */
    role: TokenRole.TokenRole
    /** Address to grant the role to. */
    to: Address
  }

  export type ReturnType = WriteContractReturnType
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
export async function renounceTokenRole<
  chain extends Chain | undefined,
  account extends Account | undefined,
>(
  client: Client<Transport, chain, account>,
  parameters: renounceTokenRole.Parameters<chain, account>,
): Promise<renounceTokenRole.ReturnType> {
  const { account = client.account, chain = client.chain, token } = parameters
  const role = TokenRole.serialize(parameters.role)
  return writeContract(client, {
    ...parameters,
    account,
    address: TokenId.toAddress(token),
    abi: tip20Abi,
    chain,
    functionName: 'renounceRole',
    args: [role],
  } as never)
}

export namespace renounceTokenRole {
  export type Parameters<
    chain extends Chain | undefined = Chain | undefined,
    account extends Account | undefined = Account | undefined,
  > = UnionOmit<
    WriteContractParameters<never, never, never, chain, account>,
    'abi' | 'address' | 'functionName' | 'args'
  > & {
    /** Address or ID of the TIP20 token. */
    token: TokenId.TokenIdOrAddress
    /** Role to renounce. */
    role: TokenRole.TokenRole
  }

  export type ReturnType = WriteContractReturnType
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
export async function revokeTokenRole<
  chain extends Chain | undefined,
  account extends Account | undefined,
>(
  client: Client<Transport, chain, account>,
  parameters: revokeTokenRole.Parameters<chain, account>,
): Promise<revokeTokenRole.ReturnType> {
  const {
    account = client.account,
    chain = client.chain,
    token,
    from,
  } = parameters
  const role = TokenRole.serialize(parameters.role)
  return writeContract(client, {
    ...parameters,
    account,
    address: TokenId.toAddress(token),
    abi: tip20Abi,
    chain,
    functionName: 'revokeRole',
    args: [role, from],
  } as never)
}

export namespace revokeTokenRole {
  export type Parameters<
    chain extends Chain | undefined = Chain | undefined,
    account extends Account | undefined = Account | undefined,
  > = UnionOmit<
    WriteContractParameters<never, never, never, chain, account>,
    'abi' | 'address' | 'functionName' | 'args'
  > & {
    /** Address to revoke the role from. */
    from: Address
    /** Role to revoke. */
    role: TokenRole.TokenRole
    /** Address or ID of the TIP20 token. */
    token: TokenId.TokenIdOrAddress
  }

  export type ReturnType = WriteContractReturnType
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
export async function setUserToken<
  chain extends Chain | undefined,
  account extends Account | undefined,
>(
  client: Client<Transport, chain, account>,
  parameters: setUserToken.Parameters<chain, account>,
): Promise<setUserToken.ReturnType> {
  const { account = client.account, chain = client.chain, token } = parameters
  return writeContract(client, {
    ...parameters,
    account,
    address: feeManagerAddress,
    abi: feeManagerAbi,
    chain,
    functionName: 'setUserToken',
    // TODO: remove once eth_estimateGas is fixed
    gas: 30_000n,
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

export type Decorator<
  chain extends Chain | undefined = Chain | undefined,
  account extends Account | undefined = Account | undefined,
> = {
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
  createToken: (
    parameters: createToken.Parameters<chain, account>,
  ) => Promise<createToken.ReturnType>
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
  getTokenAllowance: (
    parameters: getTokenAllowance.Parameters,
  ) => Promise<getTokenAllowance.ReturnType>
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
  getTokenBalance: (
    ...parameters: account extends Account
      ? [getTokenBalance.Parameters<account>] | []
      : [getTokenBalance.Parameters<account>]
  ) => Promise<getTokenBalance.ReturnType>
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
  getTokenMetadata: (
    parameters: getTokenMetadata.Parameters,
  ) => Promise<getTokenMetadata.ReturnType>
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
  getUserToken: (
    ...parameters: account extends Account
      ? [getUserToken.Parameters<account>] | []
      : [getUserToken.Parameters<account>]
  ) => Promise<getUserToken.ReturnType>
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
  grantTokenRole: (
    parameters: grantTokenRole.Parameters<chain, account>,
  ) => Promise<grantTokenRole.ReturnType>
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
  renounceTokenRole: (
    parameters: renounceTokenRole.Parameters<chain, account>,
  ) => Promise<renounceTokenRole.ReturnType>
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
  revokeTokenRole: (
    parameters: revokeTokenRole.Parameters<chain, account>,
  ) => Promise<revokeTokenRole.ReturnType>
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
  setUserToken: (
    parameters: setUserToken.Parameters<chain, account>,
  ) => Promise<setUserToken.ReturnType>
}

export function decorator() {
  return <
    transport extends Transport,
    chain extends Chain | undefined,
    account extends Account | undefined,
  >(
    client: Client<transport, chain, account>,
  ): Decorator<chain, account> => {
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
    }
  }
}
