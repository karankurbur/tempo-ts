import * as Address from 'ox/Address';
export type TokenId = bigint;
export type TokenIdOrAddress = TokenId | Address.Address;
/**
 * Converts a TIP20 token address to a token ID.
 *
 * @param address - The token address.
 * @returns The token ID.
 */
export declare function fromAddress(address: Address.Address): TokenId;
/**
 * Converts a TIP20 token ID to an address.
 *
 * @param tokenId - The token ID.
 * @returns The address.
 */
export declare function toAddress(tokenId: TokenIdOrAddress): Address.Address;
//# sourceMappingURL=TokenId.d.ts.map