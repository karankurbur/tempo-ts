import * as Address from 'ox/Address';
import * as Hex from 'ox/Hex';
const tip20Prefix = '0x20c0';
/**
 * Converts a TIP20 token address to a token ID.
 *
 * @param address - The token address.
 * @returns The token ID.
 */
export function fromAddress(address) {
    if (!address.toLowerCase().startsWith(tip20Prefix))
        throw new Error('invalid tip20 address.');
    return Hex.toBigInt(Hex.slice(address, tip20Prefix.length));
}
/**
 * Converts a TIP20 token ID to an address.
 *
 * @param tokenId - The token ID.
 * @returns The address.
 */
export function toAddress(tokenId) {
    if (typeof tokenId === 'string') {
        Address.assert(tokenId);
        return tokenId;
    }
    const tokenIdHex = Hex.fromNumber(tokenId, { size: 18 });
    return Hex.concat(tip20Prefix, tokenIdHex);
}
//# sourceMappingURL=TokenId.js.map