import { ApolloError } from "apollo-server";
import { Db, ObjectId } from "mongodb";

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

    getProducto: async (parent: any, args: { id_product: string}, context: { db: Db }) => {
        const db = context.db;
        const id_product = args.id_product;

        const producto = await db.collection("Productos_Venta").findOne({ _id: new ObjectId(id_product) });

        if(producto){
            return producto;
        }else{
            throw new ApolloError("no hay productos", "403");
        }
    },

    //cambiarlo a que el token se pase por contexto
    getProductosCarritoUser: async (parent: any, args: { token: string}, context: { db: Db }) => {
        const db = context.db;
        const token = args.token;

        const user = await db.collection("Usuarios").findOne({ token: token});
        
        if(user){
            const productos = await db.collection("Carritos").find({ Id_user: user._id.toString() }).toArray();
            
            if(productos){
                // productos.map((p) => {
                //     console.log(p);
                //     return {
                //         _id: p._id.toString(),
                        
                //     }
                // })
                return productos.map(p => ({
                    _id: p._id.toString(),
                    id_user: p.Id_user,
                    id_producto: p.Id_producto,
                    name: p.Name,
                    cantidad: p.Cantidad,
                    precioTotal: p.PrecioTotal,
                    precioTotal_freeIVA: p.PrecioTotal_freeIVA,
                }))
            }else{
                throw new ApolloError("El usuario no tiene carrito", "404");
            }
        }else{
            throw new ApolloError("ha habido un problema con el usuario", "500");
        }
    },
}
