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

    type fechasReservas{
        fechaEntrada: String!
        fechaSalida: String!
    }

    type Habitacion {
        nombre: String!
        descripcion: String!
        capacidad: String!
        foto: String!
        precio: String!
        Reservas: [fechasReservas]!
    }
    
    type Query{
        getMaderas: [Maderas!]!
        logIn(correo: String!, password: String!): String
        getHabitacionesDisponibles(fechaEntrada: String!, fechaSalida: String!, pesonas: String!): [Habitacion]
    }

    type Mutation{
        DarAltaMadera(img: String!, name: String!, description: String!): Maderas!
        BorrarMadera(id: ID!): Maderas!
        RegistrarUser(nombre: String!, apellido: String!, correo: String!, password: String!): User
        AnadirHabitacion(nombre: String!, descripcion: String!, capacidad: String!, foto: String!, precio: String!): Habitacion!
    }
`