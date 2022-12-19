import { ApolloError } from "apollo-server";
import { Db } from "mongodb";

export const Query = {
    getMaderas: async (parent: any, args: any, context: { db: Db }) => {
        const maderas = await context.db.collection("Tipos_Madera").find().toArray();

        if(maderas) {
            return maderas;
        }else{
            throw new ApolloError("No hay maderas", "403");
        }
    },
}
