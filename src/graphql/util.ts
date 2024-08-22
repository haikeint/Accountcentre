import { handleResponse } from '@/Util/RequestError'

export const getErrorMessage = (error: any) => {
    const { graphQLErrors, networkError } = error
    if (graphQLErrors && graphQLErrors.length != 0) {
        const { message, extensions } = graphQLErrors[0]
        return handleResponse(extensions.statusCode) ?? message
    }
    if (networkError) return networkError

    return 'Lỗi không xác định'
}
