export interface GraphQLResponse {
    data: any
    errors?: {
        message: string
        extensions: {
            code: string
            statusCode: number
        }
    }[]
}

export default async function fetchGraphQL(
    query: string,
    variables?: {}
): Promise<GraphQLResponse> {
    const response = await fetch(import.meta.env.VITE_URL_GRAPHQL, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables
        })
    })

    const responseData: GraphQLResponse = await response.json()
    if (responseData.errors) {
        // throw new Error(
        //     `GraphQL error! Messages: ${responseData.errors.map((err) => err.message).join(', ')}`
        // )
        throw responseData
    }
    return responseData
}
