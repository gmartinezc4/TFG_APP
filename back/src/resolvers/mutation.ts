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
    }
}