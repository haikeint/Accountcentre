export interface IAlert {
    show: (type: 'success' | 'danger' | 'warning', message: string | null) => void
}
