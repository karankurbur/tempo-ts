import * as ammActions from "./actions/amm.js";
import * as feeActions from "./actions/fee.js";
import * as policyActions from "./actions/policy.js";
import * as tokenActions from "./actions/token.js";
export function decorator() {
    return (client) => {
        return {
            amm: {
                getPoolId: (parameters) => ammActions.getPoolId(client, parameters),
                getPool: (parameters) => ammActions.getPool(client, parameters),
                getTotalSupply: (parameters) => ammActions.getTotalSupply(client, parameters),
                getLiquidityBalance: (parameters) => ammActions.getLiquidityBalance(client, parameters),
                rebalanceSwap: (parameters) => ammActions.rebalanceSwap(client, parameters),
                mint: (parameters) => ammActions.mint(client, parameters),
                burn: (parameters) => ammActions.burn(client, parameters),
                watchRebalanceSwap: (parameters) => ammActions.watchRebalanceSwap(client, parameters),
                watchFeeSwap: (parameters) => ammActions.watchFeeSwap(client, parameters),
                watchMint: (parameters) => ammActions.watchMint(client, parameters),
                watchBurn: (parameters) => ammActions.watchBurn(client, parameters),
            },
            fee: {
                // @ts-expect-error
                getUserToken: (parameters) => 
                // @ts-expect-error
                feeActions.getUserToken(client, parameters),
                setUserToken: (parameters) => feeActions.setUserToken(client, parameters),
                watchSetUserToken: (parameters) => feeActions.watchSetUserToken(client, parameters),
            },
            policy: {
                create: (parameters) => policyActions.create(client, parameters),
                setAdmin: (parameters) => policyActions.setAdmin(client, parameters),
                modifyWhitelist: (parameters) => policyActions.modifyWhitelist(client, parameters),
                modifyBlacklist: (parameters) => policyActions.modifyBlacklist(client, parameters),
                getData: (parameters) => policyActions.getData(client, parameters),
                isAuthorized: (parameters) => policyActions.isAuthorized(client, parameters),
                watchCreate: (parameters) => policyActions.watchCreate(client, parameters),
                watchAdminUpdated: (parameters) => policyActions.watchAdminUpdated(client, parameters),
                watchWhitelistUpdated: (parameters) => policyActions.watchWhitelistUpdated(client, parameters),
                watchBlacklistUpdated: (parameters) => policyActions.watchBlacklistUpdated(client, parameters),
            },
            token: {
                approve: (parameters) => tokenActions.approve(client, parameters),
                burnBlocked: (parameters) => tokenActions.burnBlocked(client, parameters),
                burn: (parameters) => tokenActions.burn(client, parameters),
                changeTransferPolicy: (parameters) => tokenActions.changeTransferPolicy(client, parameters),
                create: (parameters) => tokenActions.create(client, parameters),
                getAllowance: (parameters) => tokenActions.getAllowance(client, parameters),
                // @ts-expect-error
                getBalance: (parameters) => tokenActions.getBalance(client, parameters),
                getMetadata: (parameters) => tokenActions.getMetadata(client, parameters),
                grantRoles: (parameters) => tokenActions.grantRoles(client, parameters),
                mint: (parameters) => tokenActions.mint(client, parameters),
                pause: (parameters) => tokenActions.pause(client, parameters),
                permit: (parameters) => tokenActions.permit(client, parameters),
                renounceRoles: (parameters) => tokenActions.renounceRoles(client, parameters),
                revokeRoles: (parameters) => tokenActions.revokeRoles(client, parameters),
                setSupplyCap: (parameters) => tokenActions.setSupplyCap(client, parameters),
                setRoleAdmin: (parameters) => tokenActions.setRoleAdmin(client, parameters),
                transfer: (parameters) => tokenActions.transfer(client, parameters),
                unpause: (parameters) => tokenActions.unpause(client, parameters),
                watchApprove: (parameters) => tokenActions.watchApprove(client, parameters),
                watchBurn: (parameters) => tokenActions.watchBurn(client, parameters),
                watchCreate: (parameters) => tokenActions.watchCreate(client, parameters),
                watchMint: (parameters) => tokenActions.watchMint(client, parameters),
                watchAdminRole: (parameters) => tokenActions.watchAdminRole(client, parameters),
                watchRole: (parameters) => tokenActions.watchRole(client, parameters),
                watchTransfer: (parameters) => tokenActions.watchTransfer(client, parameters),
            },
        };
    };
}
//# sourceMappingURL=decorator.js.map