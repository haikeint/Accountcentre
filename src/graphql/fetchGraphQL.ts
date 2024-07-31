export interface GraphQLResponse {
    data: any
    errors?: { message: string }[]
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

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const responseData: GraphQLResponse = await response.json()
    if (responseData.errors) {
        throw new Error(
            `GraphQL error! Messages: ${responseData.errors.map((err) => err.message).join(', ')}`
        )
    }
    return responseData
}
