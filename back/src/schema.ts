import {gql} from "apollo-server"

export const typeDefs = gql`
    type Maderas {
        _id: ID!
        img: String!
        name: String!
        description: String!
    }

    type Query{
        getMaderas: [Maderas!]!
    }

    type Mutation{
        DarAltaMadera(img: String!, name: String!, description: String!): Maderas!
        BorrarMadera(id: ID!): Maderas!
    }
`