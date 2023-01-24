import { ApolloError } from "apollo-server";
import { Db, Double, IntegerType } from "mongodb";

import jwt from 'jsonwebtoken';


export const Query = {
    getMaderas: async (parent: any, args: any, context: { db: Db }) => {
        const db = context.db;

        const maderas = await context.db.collection("Tipos_Madera").find().toArray();

        if (maderas) {
            return maderas;
        } else {
            throw new ApolloError("No hay maderas", "403");
        }
    },

    logIn: async (parent: any, args: { correo: String, password: String }, context: { db: Db }) => {
        const db = context.db;
        const { correo, password } = args;

        const user = await db.collection("Usuarios").findOne({ Email: correo, Password: password });

        console.log(user)

        if (!user) {
            return new ApolloError("Ningun usuario con ese correo está registrado");

        } else {
            const token = jwt.sign({
                user
            }, 'este-es-el-seed', { expiresIn: '1h' });

            await db.collection("Usuarios").updateOne({ Email: correo, Password: password }, { $set: { token: token } });
            return token;
        }
    },

    getHabitacionesDisponibles: async (parent: any, args: { fechaEntrada: string, fechaSalida: string, pesonas: string }, context: { db: Db }) => {
        const db = context.db;
        const { fechaEntrada, fechaSalida, pesonas} = args;

        let reservada = false;
        const habitacionesDispo = [];
        const habitaciones = await db.collection("Habitaciones").find().toArray();

        habitaciones.map((h) => {
            if(h.Reservas.length != 0){
                h.Reservas.map((r) => {
                    if((fechaEntrada > r.fechaSalida || fechaEntrada < r.fechaEntrada)  && (fechaSalida < r.fechaEntrada || fechaSalida > r.fechaSalida)){
                        reservada = true;
                    }
                })
                // if(reservada == false){
                //     habitacionesDispo.push(h.nombre, h.descripcion, h.capacidad, h.foto, h.precio);
                // }
            }
        })

        return habitacionesDispo;
    }
}
