import * as Hash from 'ox/Hash';
import * as Hex from 'ox/Hex';
export const roles = [
    'defaultAdmin',
    'pause',
    'unpause',
    'issuer',
    'burnBlocked',
];
export const toPreHashed = {
    defaultAdmin: 'DEFAULT_ADMIN_ROLE',
    pause: 'PAUSE_ROLE',
    unpause: 'UNPAUSE_ROLE',
    issuer: 'ISSUER_ROLE',
    burnBlocked: 'BURN_BLOCKED_ROLE',
};
export function serialize(role) {
    if (role === 'defaultAdmin')
        return '0x0000000000000000000000000000000000000000000000000000000000000000';
    return Hash.keccak256(Hex.fromString(toPreHashed[role] ?? role));
}
//# sourceMappingURL=TokenRole.js.map