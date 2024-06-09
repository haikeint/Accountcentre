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
  mutation addUserMutate($username: String!, $password: String!, $email: String!) {
    register(username: $username, password: $password, email: $email) {
      id
    }
  }
`
const loginUserMutate = gql`
  mutation loginUserMutate($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
    }
  }
`
export { getUserQuery, addUserMutate, loginUserMutate }
