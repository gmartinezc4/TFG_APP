import {gql} from "apollo-server"

export const typeDefs = gql`
    type Maderas {
        _id: ID!
        img: String!
        name: String!
        description: String!
    }

    type User {
        _id: ID!
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

    type Carrito {
        _id: ID!
        id_user: ID!
        id_producto: ID!
        name: String!
        cantidad: String!
        precioTotal: String!
        precioTotal_freeIVA: String!
    }

    
    type Query{
        getMaderas: [Maderas!]!
        getProductos: [Product!]!
        getProducto (id_product: String!): Product!
        getProductosCarritoUser(token: String!): [Carrito!]
    }

    type Mutation{
        darAltaMadera(img: String!, name: String!, description: String!): Maderas!
        borrarMadera(id: ID!): Maderas!
        addProducto(img: String!, name: String!, stock: String!, precio: String!): Product!
        venderProducto(id: String!, cantidad: String!): Product!
        addStockProducto(_id: String!, cantidad: String!): Product!
        addProductCesta(id_producto: String!, name: String!, cantidad: String!, tokenUser: String!): Carrito!
        RegistrarUser(nombre: String!, apellido: String!, correo: String!, password: String!): String!
        logIn(correo: String!, password: String!): String!
        logOut:Boolean! 
    }
`