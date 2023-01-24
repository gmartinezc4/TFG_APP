import {gql} from "apollo-server"

export const typeDefs = gql`
    type Maderas {
        _id: ID!
        img: String!
        name: String!
        description: String!
    }

    type User {
        nombre: String!
        apellido: String!
        correo: String!
        password: String!
        token: String!
    }

    
    type Query{
        getMaderas: [Maderas!]!
        # logIn(correo: String!, password: String!): String
    }

    type Mutation{
        DarAltaMadera(img: String!, name: String!, description: String!): Maderas!
        BorrarMadera(id: ID!): Maderas!
        # RegistrarUser(nombre: String!, apellido: String!, correo: String!, password: String!): User
    }
`