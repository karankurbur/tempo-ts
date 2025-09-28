export declare const roles: readonly ["defaultAdmin", "pause", "unpause", "issuer", "burnBlocked"];
export type TokenRole = (typeof roles)[number] | (string & {});
export declare const toPreHashed: {
    readonly defaultAdmin: "DEFAULT_ADMIN_ROLE";
    readonly pause: "PAUSE_ROLE";
    readonly unpause: "UNPAUSE_ROLE";
    readonly issuer: "ISSUER_ROLE";
    readonly burnBlocked: "BURN_BLOCKED_ROLE";
};
export declare function serialize(role: TokenRole): `0x${string}`;
//# sourceMappingURL=TokenRole.d.ts.map