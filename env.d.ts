/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_NUMBER: number
  readonly VITE_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
