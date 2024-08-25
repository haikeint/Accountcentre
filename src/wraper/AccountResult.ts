const DEFAULT = ''

export class AccountResult {
    address: string = DEFAULT
    birthdate: string = DEFAULT
    gender: string = DEFAULT
    createdat: string = DEFAULT
    email: string = DEFAULT
    fullname: string = DEFAULT
    id: string = DEFAULT
    idcode: string = DEFAULT
    phone: string = DEFAULT
    username: string = DEFAULT

    static convertGender2Number(gender: string): number {
        switch (gender) {
            case 'Nam':
                return 1
            case 'Nữ':
                return 0
            default:
                return 2
        }
    }

    static convertGender2String(gender: number): string {
        switch (gender) {
            case 1:
                return 'Nam'
            case 0:
                return 'Nữ'
            default:
                return 'Khác'
        }
    }
}
