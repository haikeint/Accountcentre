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
            isEmailVerified
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

const MUTATION_SEND_VERIFY_EMAIL = gql`
    mutation {
        sendVerifyEmail
    }
`
const MUTATION_CHANGE_PASSWORD = gql`
    mutation changePassword($oldPassword: String!, $newPassword: String!) {
        changePassword(oldPassword: $oldPassword, newPassword: $newPassword)
    }
`

const MUTATION_CHANGE_PHONE = gql`
    mutation changePhone($oldPhone: String!, $newPhone: String!) {
        changePhone(oldPhone: $oldPhone, newPhone: $newPhone)
    }
`
const MUTATION_CHANGE_EMAIL = gql`
    mutation changeEmail($oldEmail: String!, $newEmail: String!) {
        changeEmail(oldEmail: $oldEmail, newEmail: $newEmail)
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
    MUTATION_SEND_VERIFY_EMAIL,
    MUTATION_CHANGE_PASSWORD,
    MUTATION_CHANGE_PHONE,
    MUTATION_CHANGE_EMAIL
}
