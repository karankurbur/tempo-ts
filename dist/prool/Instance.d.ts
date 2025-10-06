/**
 * Defines a Tempo instance.
 *
 * @example
 * ```ts
 * const instance = tempo()
 * await instance.start()
 * // ...
 * await instance.stop()
 * ```
 */
export declare const tempo: import("prool").DefineInstanceReturnType<{
    args: {
        /**
         * Host the server will listen on.
         */
        host?: string | undefined;
        /**
         * Port the server will listen on.
         */
        port?: number | undefined;
    };
    readonly process: import("prool/processes").Process_internal;
}, tempo.Parameters>;
export declare namespace tempo {
    type Parameters = {
        /**
         * Path or alias to the Tempo binary.
         */
        binary?: string | undefined;
        /**
         * Builder options.
         */
        builder?: {
            /**
             * The deadline for when the payload builder job should resolve.
             */
            deadline?: number | undefined;
            /**
             * Target gas limit for built blocks.
             */
            gaslimit?: bigint | undefined;
            /**
             * Maximum number of tasks to spawn for building a payload.
             */
            maxTasks?: number | undefined;
        } | undefined;
        /**
         * Chain this node is running.
         */
        chain?: string | undefined;
        /**
         * Consensus configuration for this node.
         */
        consensusConfig?: string | undefined;
        /**
         * Development options.
         */
        dev?: {
            /**
             * Interval between blocks.
             */
            blockTime?: number | undefined;
        } | undefined;
        /**
         * Faucet options.
         */
        faucet?: {
            /**
             * Target token address for the faucet to be funding with
             */
            address?: string | undefined;
            /**
             * Amount for each faucet funding transaction
             */
            amount?: bigint | undefined;
            /**
             * Faucet funding mnemonic
             */
            privateKey?: string | undefined;
        } | undefined;
        /**
         * Host the server will listen on.
         */
        host?: string | undefined;
        /**
         * Port the server will listen on.
         */
        port?: number | undefined;
    };
}
//# sourceMappingURL=Instance.d.ts.map