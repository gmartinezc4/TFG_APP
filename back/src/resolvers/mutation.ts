import { ApolloError } from "apollo-server";
import { Db, ObjectId } from "mongodb";
import { v4 as uuidv4 } from 'uuid';
const bcrypt = require('bcrypt');
var nodemailer  = require('nodemailer');
import { htmlRegistro } from '/home/guillermo/App_TFG/back/data/htmlCorreos'

export const Mutation = {
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

        const encripted_pass = await bcrypt.hash(password, 12);
        const encripted_new_pass = await bcrypt.hash(newPassword, 12);

        try {
            if (user) {
                if (nombre != "" && apellido != "" && nombre != null && apellido != null) {
                    await db.collection("Usuarios").findOneAndUpdate({ _id: user._id }, { $set: { Nombre: nombre, Apellido: apellido } });
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
                } else if (nombre != "" && nombre != null) {
                    await db.collection("Usuarios").findOneAndUpdate({ _id: user._id }, { $set: { Nombre: nombre } });
                    return {
                        _id: user._id.toString(),
                        nombre: nombre,
                        apellido: apellido,
                        correo: user.Email,
                        password: user.Password,
                        token: user.token
                    }
                } else if (newCorreo != "" && password != "" && newCorreo != null && password != null) {

                    if (await bcrypt.compare(password, user.Password)) {
                        const yaExisteCorreo = await db.collection("Usuarios").findOne({ Email: newCorreo });

                        if (!yaExisteCorreo) {
                            await db.collection("Usuarios").findOneAndUpdate({ _id: user._id }, { $set: { Email: newCorreo } });
                            return {
                                _id: user._id.toString(),
                                nombre: user.Nombre,
                                apellido: user.Apellido,
                                correo: newCorreo,
                                password: encripted_pass,
                                token: user.token
                            }
                        } else {
                            throw new ApolloError("Email ya registrado");
                        }
                    } else {
                        throw new ApolloError("Contraseña incorrecta");
                    }
                } else if (password != "" && newPassword != "" && password != null && newPassword != null) {
                    if (await bcrypt.compare(password, user.Password)) {
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

                //Creamos el objeto de transporte
                var transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    ignoreTLS: false,
                    secure: false,
                    auth: {
                        user: 'maderas.cobo.cuenca@gmail.com',
                        pass: 'fllksawjvxgrncfp'
                    }
                });

                var mailOptions = {
                    from: 'maderas.cobo.cuenca@gmail.com',
                    to: correo,
                    subject: 'Bienvenido a Maderas Cobo',
                    html: htmlRegistro,
                };

                transporter.sendMail(mailOptions, function (error: any, info: any) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email enviado: ' + info.response);
                    }
                });

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
                if (await bcrypt.compare(password, user['Password'])) {
                    const token = uuidv4();

                    await db.collection("Usuarios").updateOne({ Email: correo }, { $set: { token: token } });
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
    },

    forgotPassword: async (parent: any, args: { email: string }, context: { db: Db }) => {
        const db = context.db;
        const email = args.email;
        const codigo = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);

        try{
            const user = await db.collection("Usuarios").findOne({Email: email});

            if(user){      
                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    ignoreTLS: false,
                    secure: false,
                    auth: {
                        user: 'maderas.cobo.cuenca@gmail.com',
                        pass: 'fllksawjvxgrncfp'
                    }
                })

                var mailOptions = {
                    from: 'maderas.cobo.cuenca@gmail.com',
                    to: email,
                    subject: 'Enlace para recuperar su contraseña de Maderas Cobo',
                    text: `Su codigo de recuperación es: ${codigo}`
                };

                transporter.sendMail(mailOptions, function (error: any, info: any) {
                    if (error) {
                        console.log(error);
                        return error;
                    } else {
                        console.log('Email enviado: ' + info.response);
                    }
                });

            }else{
                throw new ApolloError("User not exist", "USER_NOT_EXIST")
            }

        }catch(e: any){
            throw new ApolloError(e, e.extensions.code);
        }

        return codigo;
    },

    recuperarPass: async (parent: any, args: { email: string, password: string }, context: { db: Db }) => {
        const db = context.db;
        const { email, password } = args;

        try{
            const user = await db.collection("Usuarios").findOne({ Email: email });

            if(user){      

                try{
                    const encripted_pass = await bcrypt.hash(password, 12);

                    await db.collection("Usuarios").updateOne({ Email: email }, { $set: { Password: encripted_pass } });
                }catch(e: any){
                    throw new ApolloError(e, e.extensions.code);
                }

                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    ignoreTLS: false,
                    secure: false,
                    auth: {
                        user: 'maderas.cobo.cuenca@gmail.com',
                        pass: 'fllksawjvxgrncfp'
                    }
                })

                var mailOptions = {
                    from: 'maderas.cobo.cuenca@gmail.com',
                    to: email,
                    subject: 'Contraseña cambiada',
                    text: `¡Su contraseña ha sido cambiada con éxito! `
                };

                transporter.sendMail(mailOptions, function (error: any, info: any) {
                    if (error) {
                        console.log(error);
                        return error;
                    } else {
                        console.log('Email enviado: ' + info.response);
                    }
                });

            }else{
                throw new ApolloError("User not exist", "USER_NOT_EXIST")
            }

        }catch(e: any){
            throw new ApolloError(e, e.extensions.code);
        }

        return password;
    },

    cancelarPedido: async (parent: any, args: { id_pedido: string }, context: { db: Db, user: any }) => {
        const { db, user } = context;
        let id_pedido = args.id_pedido;

        try {
            if (user) {
                if (id_pedido.length != 24) {
                    throw new ApolloError("ID invalido");
                } else {
                    let pedidoUserCambiado: any;

                    const pedidoUser = await db.collection("Pedidos_Activos").findOne({ _id: new ObjectId(id_pedido) });

                    if (pedidoUser) {
                        pedidoUserCambiado = pedidoUser;
                        await db.collection("Pedidos_Cancelados").insertOne({ Id_user: pedidoUser.Id_user.toString(), Estado: "Cancelado", Nombre: pedidoUser.Nombre, Apellido: pedidoUser.Apellido, Email: pedidoUser.Email, Telefono: pedidoUser.Telefono, Direccion: pedidoUser.Direccion, MasInformacion: pedidoUser.MasInformacion, CodigoPostal: pedidoUser.CodigoPostal, Ciudad: pedidoUser.Ciudad, Pais: pedidoUser.Pais, FechaPedido: pedidoUser.FechaPedido, FechaRecogida: pedidoUser.FechaRecogida, ImportePedido: pedidoUser.ImportePedido, ImporteFreeIvaPedido: pedidoUser.ImporteFreeIvaPedido, Productos: pedidoUser.Productos });
                        await db.collection("Pedidos_Activos").findOneAndDelete({ _id: new ObjectId(id_pedido) });
                    } else {
                        throw new ApolloError("Ha ocurrido un error al recuperar el pedido");
                    }

                    if (pedidoUserCambiado) {
                        return {
                            _id: pedidoUserCambiado._id,
                            id_user: pedidoUserCambiado.Id_user,
                            estado: pedidoUserCambiado.Estado,
                            nombre: pedidoUserCambiado.Nombre,
                            apellido: pedidoUserCambiado.Apellido,
                            email: pedidoUserCambiado.Email,
                            telefono: pedidoUserCambiado.Telefono,
                            direccion: pedidoUserCambiado.Direccion,
                            masInformacion: pedidoUserCambiado.MasInformacion,
                            codigoPostal: pedidoUserCambiado.CodigoPostal,
                            ciudad: pedidoUserCambiado.Ciudad,
                            pais: pedidoUserCambiado.Pais,
                            fechaPedido: pedidoUserCambiado.FechaPedido,
                            fechaRecogida: pedidoUserCambiado.FechaRecogida,
                            importePedido: pedidoUserCambiado.ImportePedido,
                            importeFreeIvaPedido: pedidoUserCambiado.ImporteFreeIvaPedido,
                            productos: pedidoUserCambiado.Productos.map((e: any) => ({
                                _id: e._id.toString(),
                                id_user: e.Id_user,
                                id_producto: e.Id_producto,
                                img: e.Img,
                                name: e.Name,
                                cantidad: e.Cantidad,
                                precioTotal: e.PrecioTotal,
                                precioTotal_freeIVA: e.PrecioTotal_freeIVA
                            }))
                        }
                    } else {
                        throw new ApolloError("Ha ocurrido un error al recuperar el pedido");
                    }
                }
            } else {
                throw new ApolloError("Ha ocurrido un error con el usuario", "500");
            }
        } catch (e: any) {
            throw new ApolloError(e, e.extensions.code);
        }
    },
}


