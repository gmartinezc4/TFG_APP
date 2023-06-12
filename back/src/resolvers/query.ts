import { ApolloError } from "apollo-server";
import { Db, ObjectId } from "mongodb";


//
// * Querys de la apliación
//
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

    getProductoCarritoUser: async (parent: any, args: { id_product: string }, context: { db: Db, user: any }) => {
        const id_product = args.id_product;
        const { db, user } = context;

        try {
            if (user) {
                const producto = await db.collection("Carritos").findOne({ Id_user: user._id.toString(), Id_producto: id_product });

                if (producto) {
                    return {
                        _id: producto._id.toString(),
                        id_user: producto.Id_user,
                        id_producto: producto.Id_producto,
                        img: producto.Img,
                        name: producto.Name,
                        cantidad: producto.Cantidad,
                        precioTotal: producto.PrecioTotal,
                        precioTotal_freeIVA: producto.PrecioTotal_freeIVA,
                    }
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

    getPedidosRecogidos: async (parent: any, args: any, context: { db: Db, user: any }) => {
        const { db, user } = context;

        try {
            if (user) {
                const pedidos = await db.collection("Pedidos_Recogidos").find({ Id_user: user._id.toString() }).toArray();

                if (pedidos) {
                    return pedidos.map(p => ({
                        _id: p._id,
                        id_user: p.Id_user,
                        estado: p.Estado,
                        nombre: p.Nombre,
                        apellido: p.Apellido,
                        email: p.Email,
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
                        productos: p.Productos.map((e: any) => ({
                            _id: e._id.toString(),
                            id_user: e.Id_user,
                            id_producto: e.Id_producto,
                            img: e.Img,
                            name: e.Name,
                            cantidad: e.Cantidad,
                            precioTotal: e.PrecioTotal,
                            precioTotal_freeIVA: e.PrecioTotal_freeIVA
                        }))

                    }))

                } else {
                    throw new ApolloError("El usuario no tiene pedidos recogidos", "404");
                }
            } else {
                throw new ApolloError("Ha ocurrido un error con el usuario", "500");
            }
        } catch (e: any) {
            throw new ApolloError(e, e.extensions.code);
        }


    },

    getPedidosActivosUser: async (parent: any, args: any, context: { db: Db, user: any }) => {
        const { db, user } = context;

        try {
            if (user) {
                const pedidos = await db.collection("Pedidos_Activos").find({ Id_user: user._id.toString() }).toArray();

                if (pedidos) {
                    return pedidos.map(p => ({
                        _id: p._id,
                        id_user: p.Id_user,
                        estado: p.Estado,
                        nombre: p.Nombre,
                        apellido: p.Apellido,
                        email: p.Email,
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
                        productos: p.Productos.map((e: any) => ({
                            _id: e._id.toString(),
                            id_user: e.Id_user,
                            id_producto: e.Id_producto,
                            img: e.Img,
                            name: e.Name,
                            cantidad: e.Cantidad,
                            precioTotal: e.PrecioTotal,
                            precioTotal_freeIVA: e.PrecioTotal_freeIVA
                        }))

                    }))

                } else {
                    throw new ApolloError("El usuario no tiene pedidos activos", "404");
                }
            } else {
                throw new ApolloError("Ha ocurrido un error con el usuario", "500");
            }
        } catch (e: any) {
            throw new ApolloError(e, e.extensions.code);
        }
    },

    getPedidosPendientesUser: async (parent: any, args: any, context: { db: Db, user: any }) => {
        const { db, user } = context;

        try {
            if (user) {
                const pedidos = await db.collection("Pedidos_Pendientes").find({ Id_user: user._id.toString() }).toArray();

                if (pedidos) {
                    return pedidos.map(p => ({
                        _id: p._id,
                        id_user: p.Id_user,
                        estado: p.Estado,
                        nombre: p.Nombre,
                        apellido: p.Apellido,
                        email: p.Email,
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
                        productos: p.Productos.map((e: any) => ({
                            _id: e._id.toString(),
                            id_user: e.Id_user,
                            id_producto: e.Id_producto,
                            img: e.Img,
                            name: e.Name,
                            cantidad: e.Cantidad,
                            precioTotal: e.PrecioTotal,
                            precioTotal_freeIVA: e.PrecioTotal_freeIVA
                        }))

                    }))

                } else {
                    throw new ApolloError("El usuario no tiene pedidos pendientes de recoger", "404");
                }
            } else {
                throw new ApolloError("Ha ocurrido un error con el usuario", "500");
            }
        } catch (e: any) {
            throw new ApolloError(e, e.extensions.code);
        }
    },

    getPedidosCanceladosUser: async (parent: any, args: any, context: { db: Db, user: any }) => {
        const { db, user } = context;

        try {
            if (user) {
                const pedidos = await db.collection("Pedidos_Cancelados").find({ Id_user: user._id.toString() }).toArray();

                if (pedidos) {
                    return pedidos.map(p => ({
                        _id: p._id,
                        id_user: p.Id_user,
                        estado: p.Estado,
                        nombre: p.Nombre,
                        apellido: p.Apellido,
                        email: p.Email,
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
                        productos: p.Productos.map((e: any) => ({
                            _id: e._id.toString(),
                            id_user: e.Id_user,
                            id_producto: e.Id_producto,
                            img: e.Img,
                            name: e.Name,
                            cantidad: e.Cantidad,
                            precioTotal: e.PrecioTotal,
                            precioTotal_freeIVA: e.PrecioTotal_freeIVA
                        }))

                    }))

                } else {
                    throw new ApolloError("El usuario no tiene pedidos cancelados", "404");
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
    },
}