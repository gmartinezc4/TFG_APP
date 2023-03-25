import { ApolloError } from "apollo-server";
import { Db, ObjectId } from "mongodb";
import { v4 as uuidv4 } from 'uuid';
const bcrypt = require('bcrypt');

export const Mutation = {
    darAltaMadera: async (parent: any, args: { img: String, name: String, description: String }, context: { db: Db }) => {
        const db = context.db;
        const { img, name, description } = args;

        try {
            await db.collection("Tipos_Madera").insertOne({ img, name, description });
            return { img, name, description }
        } catch (e: any) {
            throw new ApolloError(e, e.extensions.code);
        }

    },

    borrarMadera: async (parent: any, args: { id: string }, context: { db: Db }) => {
        const db = context.db;
        const id = args.id;

        try {


            const madera = await db.collection("Tipos_Madera").findOne({ _id: new ObjectId(id) });
            if (madera) {
                await db.collection("Tipos_Madera").deleteOne({ _id: new ObjectId(id) });
            }
            return {
                id: id,
                ...madera
            };
        } catch (e: any) {
            throw new ApolloError(e, e.extensions.code);
        }
    },

    addProducto: async (parent: any, args: { img: string, name: string, stock: string, precio: string }, context: { db: Db }) => {
        const db = context.db;
        const { img, name, stock, precio } = args;

        try {
            const precioInt: number = parseInt(precio)

            await db.collection("Productos_Venta").insertOne({ img, name, stock, precio: precioInt })
            return {
                img,
                name,
                stock,
                precio: precioInt
            }
        } catch (e: any) {
            throw new ApolloError(e, e.extensions.code);
        }
    },

    venderProductos: async (parent: any, args: { nombre: string, apellido: string, correo: string, telefono: string, direccion: string, masInformacion: string, codigoPostal: string, ciudad: string, pais: String }, context: { db: Db, user: any }) => {
        const { db, user } = context;
        const { nombre, apellido, correo, telefono, direccion, masInformacion, codigoPostal, ciudad, pais } = args;
        let importeFinalPedido: number = 0;
        let importe_freeIVAFinalPedido: number = 0;
        let productosPedido: Array<any> = [];
        let fecha = new Date();

        try {
            if (user) {

                const fechaHoy = (fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear()).toString()
                const fechaRecogida = ((fecha.getDate() + 2) + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear() + " - " + (fecha.getDate() + 4) + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear()).toString();

                const carritoUser = await db.collection("Carritos").find({ Id_user: user._id.toString() }).toArray();
                if (carritoUser.length > 0) {
                    carritoUser.map(async (p: any) => {
                        productosPedido.push(p);
                        importeFinalPedido = importeFinalPedido + p.PrecioTotal;
                        importe_freeIVAFinalPedido = importe_freeIVAFinalPedido + p.PrecioTotal_freeIVA;

                        const productStock = await db.collection("Productos_Venta").findOne({ _id: new ObjectId(p.Id_producto) });

                        let newStock = parseInt(productStock?.stock) - parseInt(p.Cantidad);

                        await db.collection("Productos_Venta").updateOne({ _id: new ObjectId(p.Id_producto) }, { $set: { stock: newStock.toString() } })
                    })
                    await db.collection("Carritos").deleteMany({ Id_user: user._id.toString() });
                    await db.collection("Pedidos_Activos").insertOne({ Id_user: user._id.toString(), Estado: "Activo", Nombre: nombre, Apellido: apellido, Email: correo, Telefono: telefono, Direccion: direccion, MasInformacion: masInformacion, CodigoPostal: codigoPostal, Ciudad: ciudad, Pais: pais, FechaPedido: fechaHoy, FechaRecogida: fechaRecogida, ImportePedido: importeFinalPedido, ImporteFreeIvaPedido: importe_freeIVAFinalPedido, Productos: productosPedido });
                    await db.collection("Historial_Pedidos").insertOne({ Id_user: user._id.toString(), Estado: "Activo", Nombre: nombre, Apellido: apellido, Email: correo, Telefono: telefono, Direccion: direccion, MasInformacion: masInformacion, CodigoPostal: codigoPostal, Ciudad: ciudad, Pais: pais, FechaPedido: fechaHoy, FechaRecogida: fechaRecogida, ImportePedido: importeFinalPedido, ImporteFreeIvaPedido: importe_freeIVAFinalPedido, Productos: productosPedido });

                    return {
                        id_user: user._id.toString(),
                        estado: "Activo",
                        nombre: nombre,
                        apellido: apellido,
                        email: correo,
                        telefono: telefono,
                        direccion: direccion,
                        masInformacion: masInformacion,
                        codigoPostal: codigoPostal,
                        ciudad: ciudad,
                        pais: pais,
                        fechaPedido: fechaHoy,
                        fechaRecogida: fechaRecogida,
                        importePedido: importeFinalPedido,
                        importeFreeIvaPedido: importe_freeIVAFinalPedido,
                    }
                } else {
                    throw new ApolloError("Ha ocurrido un error con el carrito del usuario")
                }
            } else {
                throw new ApolloError("Ha ocurrido un error con el usuario")
            }
        } catch (e: any) {
            throw new ApolloError(e, e.extensions.code);
        }
    },

    //sin probar, seguramente me borre todo al hacer el update y me deje solo el stock
    addStockProducto: async (parent: any, args: { _id: string, cantidad: string }, context: { db: Db }) => {
        const db = context.db;
        const { _id, cantidad } = args;
        let newStock: number;
        try {
            const producto = await db.collection("Productos_Venta").findOne({ _id: new ObjectId(_id) })

            if (producto) {
                newStock = parseInt(producto.stock) + parseInt(cantidad);
                await db.collection("Productos_Venta").updateOne({ _id: new ObjectId(_id) }, { $set: { stock: newStock.toString() } })
            } else {
                throw new ApolloError("Ese producto no existe");
            }

            return {
                ...producto,
                stock: newStock.toString()
            }
        } catch (e: any) {
            throw new ApolloError(e, e.extensions.code);
        }
    },

    addProductCesta: async (parent: any, args: { id_producto: string, cantidad: string }, context: { db: Db, user: any }) => {
        const { db, user } = context;
        const { id_producto, cantidad } = args;
        let newStock: number;
        let importe: number;
        let importe_freeIVA: number;
        let hayCarrito: Boolean = false;
        try {
            if (user) {
                const productoVendido = await db.collection("Productos_Venta").findOne({ _id: new ObjectId(id_producto) })

                if (productoVendido) {
                    newStock = parseInt(productoVendido.stock) - parseInt(cantidad);
                    importe = parseInt(cantidad) * parseInt(productoVendido.precio);
                    importe_freeIVA = importe / 1.21;
                    console.log(productoVendido.name)
                    if (newStock >= 0) {

                        const carritoUser = await db.collection("Carritos").find({ Id_user: user._id.toString() }).toArray();

                        if (carritoUser) {
                            carritoUser.map(async (e: any) => {
                                if (e.Id_producto == id_producto) {
                                    hayCarrito = true;
                                    const newCantidad: number = parseInt(e.Cantidad) + parseInt(cantidad);
                                    await db.collection("Carritos").updateOne({ Id_user: user._id.toString(), Id_producto: id_producto }, { $set: { Cantidad: newCantidad.toString(), PrecioTotal: e.PrecioTotal + importe, PrecioTotal_freeIVA: e.PrecioTotal_freeIVA + importe_freeIVA } });
                                }
                            })
                        }

                        if (!hayCarrito) {
                            await db.collection("Carritos").insertOne({ Id_user: user._id.toString(), Id_producto: id_producto, Img: productoVendido.img, Name: productoVendido.name, Cantidad: cantidad, PrecioTotal: importe, PrecioTotal_freeIVA: importe_freeIVA })
                        }

                    } else {
                        throw new ApolloError("Cantidad superior a Stock")
                    }
                } else {
                    throw new ApolloError("El producto no existe", "404");
                }

                return {
                    id_user: user._id.toString(),
                    id_producto,
                    img: productoVendido.img,
                    name: productoVendido.name,
                    cantidad,
                    precioTotal: importe,
                    precioTotal_freeIVA: importe_freeIVA,
                }
            } else {
                throw new ApolloError("Error en el usuario", "404");
            }
        } catch (e: any) {
            throw new ApolloError(e, e.extensions.code);
        }
    },

    deleteProductCesta: async (parent: any, args: { id: string }, context: { db: Db }) => {
        const db = context.db;
        const id = args.id;
        try {
            const carritoUser = await db.collection("Carritos").findOne({ _id: new ObjectId(id) });

            if (carritoUser) {
                await db.collection("Carritos").deleteOne({ _id: new ObjectId(id) });
                return "Producto eliminado correctamente";
            } else {
                throw new ApolloError("ha ocurrido un problema", "500");
            }
        } catch (e: any) {
            throw new ApolloError(e, e.extensions.code);
        }
    },

    modificarUser: async (parent: any, args: { nombre: string, apellido: string, newCorreo: string, password: string, newPassword: string }, context: { db: Db, user: any }) => {
        const { db, user } = context;
        const { nombre, apellido, newCorreo, password, newPassword } = args;

        const encripted_pass = await bcrypt.hash(newPassword, 12);
        const encripted_new_pass = await bcrypt.hash(newPassword, 12);

        try {
            if (user) {
                if (nombre != "" && nombre != null) {
                    await db.collection("Usuarios").findOneAndUpdate({ _id: user._id }, { $set: { Nombre: nombre } });
                    return {
                        _id: user._id.toString(),
                        nombre: nombre,
                        apellido: apellido,
                        correo: user.Email,
                        password: user.Password,
                        token: user.token
                    }
                } else if (apellido != "" && apellido != null) {
                    await db.collection("Usuarios").findOneAndUpdate({ _id: user._id }, { $set: { Apellido: apellido } });
                    return {
                        _id: user._id.toString(),
                        nombre: nombre,
                        apellido: apellido,
                        correo: user.Email,
                        password: user.Password,
                        token: user.token
                    }
                } else if (nombre != "" && apellido != "" && nombre != null && apellido != null) {
                    await db.collection("Usuarios").findOneAndUpdate({ _id: user._id }, { $set: { Nombre: nombre, Apellido: apellido } });
                    return {
                        _id: user._id.toString(),
                        nombre: nombre,
                        apellido: apellido,
                        correo: user.Email,
                        password: user.Password,
                        token: user.token
                    }
                } else if (newCorreo != "" && password != "" && newCorreo != null && password != null) {
                    if (user.Password == password) {
                        const yaExisteCorreo = await db.collection("Usuarios").findOne({ Email: newCorreo });

                        if (!yaExisteCorreo) {
                            await db.collection("Usuarios").findOneAndUpdate({ _id: user._id }, { $set: { Email: newCorreo } });
                            return {
                                _id: user._id.toString(),
                                nombre: user.Nombre,
                                apellido: user.Apellido,
                                correo: newCorreo,
                                password: user.Password,
                                token: user.token
                            }
                        } else {
                            throw new ApolloError("Email ya registrado");
                        }
                    } else {
                        throw new ApolloError("Contraseña incorrecta");
                    }
                } else if (password != "" && newPassword != "" && password != null && newPassword != null) {
                    if (bcrypt.compare(user.Password, password)) {
                        await db.collection("Usuarios").findOneAndUpdate({ _id: user._id }, { $set: { Password: encripted_new_pass } });
                        return {
                            _id: user._id.toString(),
                            nombre: user.Nombre,
                            apellido: user.Apellido,
                            correo: user.Email,
                            password: encripted_new_pass,
                            token: user.token
                        }
                    } else {
                        throw new ApolloError("Contraseña incorrecta");
                    }
                }
            } else {
                throw new ApolloError("Ha habido un error con el usuario");
            }
        } catch (e: any) {
            throw new ApolloError(e, e.extensions.code);
        }

    },

    RegistrarUser: async (parent: any, args: { nombre: string, apellido: string, correo: string, password: string }, context: { db: Db }) => {
        const db = context.db;
        const { nombre, apellido, correo, password } = args;
        try {
            if (nombre == "" || apellido == "" || correo == "" || password == "") {
                return new ApolloError("Faltan campos por completar");
            }

            const user = await db.collection("Usuarios").findOne({ Email: correo });

            if (!user) {
                const token = uuidv4();
                const encripted_pass = await bcrypt.hash(password, 12);

                await db.collection("Usuarios").insertOne({ Nombre: nombre, Apellido: apellido, Email: correo, Password: encripted_pass, token: token });
                return token;
            } else {
                return new ApolloError("El correo ya esta registrado");
            }
        } catch (e: any) {
            throw new ApolloError(e, e.extensions.code);
        }
    },

    logIn: async (parent: any, args: { correo: String, password: String }, context: { db: Db }) => {
        const db = context.db;
        const { correo, password } = args;
        try {
            const user = await db.collection("Usuarios").findOne({ Email: correo });

            if (!user) {
                return new ApolloError("Ningun usuario con ese correo está registrado");

            } else {
                if (bcrypt.compare(password, user['Password'])) {
                    const token = uuidv4();

                    await db.collection("Usuarios").updateOne({ Email: correo}, { $set: { token: token } });
                    return token;
                }
            }
        } catch (e: any) {
            throw new ApolloError(e, e.extensions.code);
        }
    },

    logOut: async (parent: any, args: any, context: { db: Db, user: any }) => {
        const { db, user } = context;
        try {
            if (!user) {
                throw new ApolloError("User not exist", "USER_NOT_EXIST")
            } else {
                await db.collection("Usuarios").updateOne({ token: user.token.toString() }, { $set: { token: null } });
                return true;
            }
        } catch (e: any) {
            throw new ApolloError(e, e.extensions.code);
        }
    }
}

