import gql from 'graphql-tag'

const getUserQuery = gql`
    query getUserQuery {
        user {
            id
            username
            email
        }
    }
`

const addUserMutate = gql`
    mutation addUserMutate(
        $username: String!
        $password: String!
        $email: String!
        $recaptcha: String!
    ) {
        register(username: $username, password: $password, email: $email, recaptcha: $recaptcha)
    }
`

const authencation = gql`
    mutation Login($username: String!, $password: String!, $rectoken: String!, $recver: Int!) {
        login(username: $username, password: $password, rectoken: $rectoken, recver: $recver)
    }
`

const checkAccountExistQuery = gql`
    query CheckAccountExist($username: String!) {
        checkAccountExist(username: $username)
    }
`

const QUERY_GET_ACCOUNT = `
    query getAccount {
        account {
            username
            id
            createdat
            fullname
            gender
            birthdate
            address
            email
            phone
        }
    }
`

const MUTATION_LOGOUT = `
    mutation Logout {
        logout
    }
`
const MUTATION_UPDATE_INFO = gql`
    mutation Updateinfo($objectInput: UpdateInfoInput!) {
        updateInfo(objectInput: $objectInput)
    }
`
const MUTATION_UPDATE_SECURE = gql`
    mutation UpdateSecure($objectInput: UpdateSecureInput!) {
        updateSecure(objectInput: $objectInput)
    }
`
export {
    getUserQuery,
    addUserMutate,
    authencation,
    checkAccountExistQuery,
    QUERY_GET_ACCOUNT,
    MUTATION_LOGOUT,
    MUTATION_UPDATE_INFO,
    MUTATION_UPDATE_SECURE
}
