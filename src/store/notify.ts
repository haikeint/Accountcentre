import { defineStore } from 'pinia'
import { ref, toRaw } from 'vue'

export const useNotifyStore = defineStore('notify', () => {
    const notify = ref<string | null>(null)

    const getNotify = (): string | null => {
        const mes: string | null = toRaw(notify.value)
        notify.value = null
        return mes
    }

    const checkNotify = () => {
        return notify.value != null
    }

    const setNotify = (mes: string) => {
        notify.value = mes
    }

    return { setNotify, getNotify, checkNotify }
})
