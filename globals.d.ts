// globals.d.ts
export {}

declare global {
    interface Window {
        grecaptcha: any
        recaptchav2: boolean
        recaptchav3: boolean
    }
}
