import { ApolloError } from "apollo-server";
import { Db, ObjectId } from "mongodb";

export const Mutation = {
    DarAltaMadera: async (parent: any, args: {img: String, name: String, description: String}, context: { db: Db }) => {
        const db = context.db;
        const {img, name, description} = args;

        await db.collection("Tipos_Madera").insertOne({img, name, description});
        return { img, name, description}
    },

    BorrarMadera: async(parent: any, args: {id: string}, context: {db: Db}) => {
        const db = context.db;
        const id = args;

        
        const madera = await db.collection("Tipos_Madera").findOne({_id: new ObjectId(args.id)});//_id: new ObjectId(parent.user)
        if(madera){
            await db.collection("Tipos_Madera").deleteOne({ _id: new ObjectId(args.id) });
        }
        return {
            id: args.id,
            ...madera
        };
    },

    // RegistrarUser: async(parent: any, args: {nombre: string, apellido: string, correo: string, password: string}, context: {db: Db}) => {
    //     const db = context.db;
    //     const {nombre, apellido, correo, password} = args;
    //     console.log(nombre)
    //     console.log(apellido)
    //     console.log(correo)
    //     console.log(password)
    //     if(nombre == "" || apellido == "" || correo == "" || password == ""){
    //         return new ApolloError("Faltan campos por completar");
    //     }
        
    //     const user = await db.collection("Usuarios").findOne({Email: correo});
    //     console.log(user);
    //     if(!user){
    //         await db.collection("Usuarios").insertOne({Nombre: nombre, Apellido: apellido, Email: correo, Password: password});
    //         return {nombre, apellido, correo, password}
    //     }else{
    //         return new ApolloError("El correo ya esta registrado");
    //     }     
    // },
}