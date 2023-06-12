import {gql} from "apollo-server"


//
// * Esquema usado por la app. 
// * Tipos de datos, querys y mutations.
//
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
        email: String!
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
        getProductosCarritoUser: [Carrito!]
        getProductoCarritoUser (id_product: String!): Carrito!
        getPedidosRecogidos: [Pedido!]
        getPedidosActivosUser: [Pedido!]
        getPedidosPendientesUser: [Pedido!]
        getPedidosCanceladosUser: [Pedido!]
        getUser: User!
    }

    type Mutation{
        venderProductos(nombre: String!, apellido: String!, correo: String!, telefono: String!, direccion: String!, masInformacion: String!, codigoPostal: String!, ciudad: String!, pais: String!): Pedido!
        addStockProducto(_id: String!, cantidad: String!): Product!
        addProductCesta(id_producto: String!, cantidad: String!): Carrito!
        deleteProductCesta(id: ID!): String!
        modificarUser(nombre: String, apellido: String, newCorreo: String, password: String, newPassword: String): User!
        RegistrarUser(nombre: String!, apellido: String!, correo: String! password: String!): String!
        logIn(correo: String!, password: String!): String!
        logOut:Boolean! 
        borraUser: User!
        forgotPassword(email: String!): String!
        recuperarPass(email: String!, password: String!): String!
        cancelarPedido(id_pedido: ID!, bbdd: String!): Pedido!
    }
`