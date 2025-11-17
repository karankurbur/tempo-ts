interface ImportMetaEnv {
  readonly RPC_PORT: string
  readonly VITE_RPC_LOGS: 'true' | 'false'
  readonly VITE_RPC_ENV: 'local' | 'testnet' | 'devnet'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
