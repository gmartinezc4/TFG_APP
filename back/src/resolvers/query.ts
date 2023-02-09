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

        if (productos) {
            return productos;
        } else {
            throw new ApolloError("no hay productos", "403");
        }
    },

    getProducto: async (parent: any, args: { id_product: string }, context: { db: Db }) => {
        const db = context.db;
        const id_product = args.id_product;

        const producto = await db.collection("Productos_Venta").findOne({ _id: new ObjectId(id_product) });

        if (producto) {
            return producto;
        } else {
            throw new ApolloError("no hay productos", "403");
        }
    },

    //cambiarlo a que el token se pase por contexto
    getProductosCarritoUser: async (parent: any, args: { token: string }, context: { db: Db }) => {
        const db = context.db;
        const token = args.token;

        const user = await db.collection("Usuarios").findOne({ token: token });

        if (user) {
            const productos = await db.collection("Carritos").find({ Id_user: user._id.toString() }).toArray();

            if (productos) {
                return productos.map(p => ({
                    _id: p._id.toString(),
                    id_user: p.Id_user,
                    id_producto: p.Id_producto,
                    img: p.Img,
                    name: p.Name,
                    cantidad: p.Cantidad,
                    precioTotal: p.PrecioTotal,
                    precioTotal_freeIVA: p.PrecioTotal_freeIVA,
                }))
            } else {
                throw new ApolloError("El usuario no tiene carrito", "404");
            }
        } else {
            throw new ApolloError("ha habido un problema con el usuario", "500");
        }
    },

    getPedidosUser: async (parent: any, args: { id_user: string }, context: { db: Db }) => {
        const db = context.db;
        const id_user = args.id_user;

        const pedidos = await db.collection("Historial_Pedidos").find({ Id_user: id_user }).toArray();

        if (pedidos) {
            console.log(pedidos)
            return pedidos.map(p => ({

                id_user: p.Id_user,
                estado: p.Estado,
                nombre: p.Nombre,
                apellido: p.Apellido,
                telefono: p.Telefono,
                direccion: p.Direccion,
                masInformacion: p.MasInformacion,
                codigoPostal: p.CodigoPostal,
                ciudad: p.Ciudad,
                pais: p.Pais,
                fechaPedido: p.FechaPedido,
                fechaRecogida: p.FechaRecogida,
                importePedido: p.ImportePedido,
                importeFreeIvaPedido: p.ImporteFreeIvaPedido,
                productos: p.Productos

            }))

        } else {
            throw new ApolloError("El usuario no tiene pedidos", "404");
        }
    },
}

// p.Productos.map((e: any) => ({
//     id_user: p.id_user,
//     estado: p.Estado,
//     nombre: p.Nombre,
//     apellido: p.Apellido,
//     telefono: p.Telefono,
//     direccion: p.Direccion,
//     masInformacion: p.MasInformacion,
//     codigoPostal: p.CodigoPostal,
//     ciudad: p.Ciudad,
//     pais: p.Pais,
//     fechaPedido: p.FechaHoy,
//     fechaRecogida: p.FechaRecogida,
//     importePedido: p.ImporteFinalPedido,
//     importeFreeIvaPedido: p.Importe_freeIVAFinalPedido,
//     productos: {
//         _id: e._id.toString(),
//         id_user: e.Id_user,
//         id_producto: e.Id_producto,
//         img: e.Img,
//         name: e.Name,
//         cantidad: e.Cantidad,
//         precioTotal: e.PrecioTotal,
//         precioTotal_freeIVA: e.PrecioTotal_freeIVA
//     }


// {
//     _id: p.productos._id.toString(),
//     id_user: p.productos.Id_user,
//     id_producto: p.productos.Id_producto,
//     img: p.productos.Img,
//     name: p.productos.Name,
//     cantidad: p.productos.Cantidad,
//     precioTotal: p.productos.PrecioTotal,
//     precioTotal_freeIVA: p.productos.PrecioTotal_freeIVA
// }