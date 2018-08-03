import { gql } from 'apollo-server-express';

export default gql `
    type User {
        id: Int!,
        username: String!,
        email: String!,
        password: String!
    }

    type Query {
        users: [User!]!,
        user(id: Int!): User!
    }
    type Register {
        ok: Boolean!,
        user: User
        error: [Error!]
    }

    type Mutation {
       registerUser(username: String!, email: String!, password: String!): Register!
    }
`