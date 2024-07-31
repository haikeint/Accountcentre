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

const logoutMutate = gql`
    mutation Logout {
        logout
    }
`
export { getUserQuery, addUserMutate, authencation, checkAccountExistQuery, logoutMutate }
