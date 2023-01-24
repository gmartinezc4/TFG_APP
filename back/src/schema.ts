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

    type Product {
        _id: ID!
        img: String!
        name: String!
        stock: String!
        precio: String!
    }

    
    type Query{
        getMaderas: [Maderas!]!
        getProductos: [Product!]!
        # logIn(correo: String!, password: String!): String
    }

    type Mutation{
        darAltaMadera(img: String!, name: String!, description: String!): Maderas!
        borrarMadera(id: ID!): Maderas!
        addProducto(img: String!, name: String!, stock: String!, precio: String!): Product!
        venderProducto(id: String!, cantidad: String!): Product!
        addStockProducto(_id: String!, cantidad: String!): Product!
        # RegistrarUser(nombre: String!, apellido: String!, correo: String!, password: String!): User
    }
`