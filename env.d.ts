/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_NUMBER: number
    readonly VITE_KEY: string
    readonly VITE_URL_GRAPHQL: string
    readonly VITE_RECAPTCHAV2_KEY: string
    readonly VITE_RECAPTCHAV3_KEY: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
