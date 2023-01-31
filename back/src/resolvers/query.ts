import { ApolloError } from "apollo-server";
import { Db } from "mongodb";

export const Query = {
    getMaderas: async (parent: any, args: any, context: { db: Db }) => {
        const db = context.db;

        const maderas = await db.collection("Tipos_Madera").find().toArray();

        if (maderas) {
            return maderas;
        } else {
            throw new ApolloError("No hay maderas", "403");
        }
    },
    
    getProductos: async (parent: any, args: any, context: { db: Db }) => {
        const db = context.db;

        const productos = await db.collection("Productos_Venta").find().toArray();

        if(productos){
            return productos;
        }else{
            throw new ApolloError("no hay productos", "403");
        }
    },
}
