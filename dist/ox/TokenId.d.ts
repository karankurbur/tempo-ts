import type * as Address from 'ox/Address';
/**
 * Converts a TIP20 token address to a token ID.
 *
 * @param address - The token address.
 * @returns The token ID.
 */
export declare function fromAddress(address: Address.Address): number;
/**
 * Converts a TIP20 token ID to an address.
 *
 * @param tokenId - The token ID.
 * @returns The address.
 */
export declare function toAddress(tokenId: number): `0x${string}`;
//# sourceMappingURL=TokenId.d.ts.map