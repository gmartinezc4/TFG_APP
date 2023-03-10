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

        try {

            const productos = await db.collection("Productos_Venta").find().toArray();

            if (productos) {
                return productos;
            } else {
                throw new ApolloError("no hay productos", "403");
            }

        } catch (e: any) {
            throw new ApolloError(e, e.extensions.code);
        }

    },

    getProducto: async (parent: any, args: { id_product: string }, context: { db: Db }) => {
        const db = context.db;
        const id_product = args.id_product;

        try {
            const producto = await db.collection("Productos_Venta").findOne({ _id: new ObjectId(id_product) });

            if (producto) {
                return producto;
            } else {
                throw new ApolloError("no hay productos", "403");
            }

        } catch (e: any) {
            throw new ApolloError(e, e.extensions.code);
        }


    },

    getProductosCarritoUser: async (parent: any, args: any, context: { db: Db, user: any }) => {
        const { db, user } = context;

        try {
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
                throw new ApolloError("Ha ocurrido un error con el usuario", "500");
            }
        } catch (e: any) {
            throw new ApolloError(e, e.extensions.code);
        }


    },

    getPedidosUser: async (parent: any, args: { id_user: string }, context: { db: Db, user: any }) => {
        const { db, user } = context;
        const id_user = args.id_user;

        try {
            if (user) {
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
            } else {
                throw new ApolloError("Ha ocurrido un error con el usuario", "500");
            }
        } catch (e: any) {
            throw new ApolloError(e, e.extensions.code);
        }


    },

    getUser: async (parent: any, args: any, context: { user: any }) => {
        const user = context.user;

        try {
            if (user) {
                return {
                    _id: user._id.toString(),
                    nombre: user.Nombre,
                    apellido: user.Apellido,
                    correo: user.Email,
                    password: user.Password
                }
            }
        } catch (e: any) {
            throw new ApolloError(e, e.extensions.code);
        }
    }
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