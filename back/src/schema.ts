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
        img: String!
        name: String!
        cantidad: String!
        precioTotal: String!
        precioTotal_freeIVA: String!
    }
    
    type Pedido {
        _id: ID!
        id_user: ID!
        estado: String!
        nombre: String!
        apellido: String!
        telefono: String!
        direccion: String!
        masInformacion: String!
        codigoPostal: String!
        ciudad: String!
        pais: String!
        fechaPedido: String!
        fechaRecogida: String!
        importePedido: String!
        importeFreeIvaPedido: String!
        productos: [Carrito!]!
    }

    
    type Query{
        getMaderas: [Maderas!]!
        getProductos: [Product!]!
        getProducto (id_product: String!): Product!
        getProductosCarritoUser(token: String!): [Carrito!]
        getPedidosUser(id_user: String!): [Pedido!]!
    }

    type Mutation{
        darAltaMadera(img: String!, name: String!, description: String!): Maderas!
        borrarMadera(id: ID!): Maderas!
        addProducto(img: String!, name: String!, stock: String!, precio: String!): Product!
        venderProductos(id_user: String!, nombre: String!, apellido: String!, telefono: String!, direccion: String!, masInformacion: String!, codigoPostal: String!, ciudad: String!, pais: String!): Pedido!
        addStockProducto(_id: String!, cantidad: String!): Product!
        addProductCesta(id_producto: String!, cantidad: String!, tokenUser: String!): Carrito!
        deleteProductCesta(id: ID!): String!
        RegistrarUser(nombre: String!, apellido: String!, correo: String!, password: String!): String!
        logIn(correo: String!, password: String!): String!
        logOut:Boolean! 
    }
`