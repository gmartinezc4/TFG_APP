import { ApolloError } from "apollo-server";
import { Db, ObjectId } from "mongodb";
var jwt = require('jsonwebtoken');

export const Mutation = {
    darAltaMadera: async (parent: any, args: { img: String, name: String, description: String }, context: { db: Db }) => {
        const db = context.db;
        const { img, name, description } = args;

        await db.collection("Tipos_Madera").insertOne({ img, name, description });
        return { img, name, description }
    },

    borrarMadera: async (parent: any, args: { id: string }, context: { db: Db }) => {
        const db = context.db;
        const id = args;


        const madera = await db.collection("Tipos_Madera").findOne({ _id: new ObjectId(args.id) });//_id: new ObjectId(parent.user)
        if (madera) {
            await db.collection("Tipos_Madera").deleteOne({ _id: new ObjectId(args.id) });
        }
        return {
            id: args.id,
            ...madera
        };
    },

    addProducto: async (parent: any, args: { img: string, name: string, stock: string, precio: string }, context: { db: Db }) => {
        const db = context.db;
        const { img, name, stock, precio } = args;

        await db.collection("Productos_Venta").insertOne({ img, name, stock, precio })
        return {
            img,
            name,
            stock,
            precio
        }
    },

    venderProducto: async (parent: any, args: { id: string, cantidad: string }, context: { db: Db }) => {
        const db = context.db;
        const { id, cantidad } = args;
        let newStock: number;
        let importe: number;
        let importe_freeIVA: number;

        const productoVendido = await db.collection("Productos_Venta").findOne({ _id: new ObjectId(id) })

        if (productoVendido) {
            newStock = parseInt(productoVendido.stock) - parseInt(cantidad);
            importe = parseInt(cantidad) * parseInt(productoVendido.precio);
            importe_freeIVA = importe / 1.21;

            if (newStock >= 0) {
                await db.collection("Productos_Venta").updateOne({ _id: new ObjectId(id) }, { $set: { stock: newStock.toString() } })
                await db.collection("Historial_Pedidos").insertOne({ id_product: id, name: productoVendido.name, cantidad: cantidad, importe: importe.toString(), importe_freeIVA: importe_freeIVA.toString() });
                await db.collection("Pedidos_Activos").insertOne({ id_product: id, name: productoVendido.name, cantidad: cantidad, importe: importe.toString(), importe_freeIVA: importe_freeIVA.toString() });
            } else {
                throw new ApolloError("Cantidad superior a Stock")
            }
        } else {
            throw new ApolloError("El producto no existe", "404");
        }
        console.log(newStock)
        return {
            ...productoVendido,
            stock: newStock.toString(),
        }
    },

    addStockProducto: async (parent: any, args: { _id: string, cantidad: string }, context: { db: Db }) => {
        const db = context.db;
        const { _id, cantidad } = args;
        let newStock: number;

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
    },

    addProductCesta: async (parent: any, args: { id: string, cantidad: string }, context: { db: Db }) => {
        const db = context.db;
        const { id, cantidad } = args;
        let newStock: number;
        let importe: number;
        let importe_freeIVA: number;

        const productoVendido = await db.collection("Productos_Venta").findOne({ _id: new ObjectId(id) })

        if (productoVendido) {
            newStock = parseInt(productoVendido.stock) - parseInt(cantidad);
            importe = parseInt(cantidad) * parseInt(productoVendido.precio);
            importe_freeIVA = importe / 1.21;

            if (newStock >= 0) {
                await db.collection("Productos_Venta").updateOne({ _id: new ObjectId(id) }, { $set: { stock: newStock.toString() } })

            } else {
                throw new ApolloError("Cantidad superior a Stock")
            }
        } else {
            throw new ApolloError("El producto no existe", "404");
        }
        console.log(newStock)
        return {
            ...productoVendido,
            stock: newStock.toString(),
        }
    },

    RegistrarUser: async (parent: any, args: { nombre: string, apellido: string, correo: string, password: string }, context: { db: Db }) => {
        const db = context.db;
        const { nombre, apellido, correo, password } = args;
        console.log(nombre)
        console.log(apellido)
        console.log(correo)
        console.log(password)
        if (nombre == "" || apellido == "" || correo == "" || password == "") {
            return new ApolloError("Faltan campos por completar");
        }

        const user = await db.collection("Usuarios").findOne({ Email: correo });
        console.log(user);
        if (!user) {
            const token = jwt.sign({
                user
            }, 'este-es-el-seed', { expiresIn: '1h' });

            await db.collection("Usuarios").insertOne({ Nombre: nombre, Apellido: apellido, Email: correo, Password: password, token: token });
            return { nombre, apellido, correo, password }
        } else {
            return new ApolloError("El correo ya esta registrado");
        }
    },

    logIn: async (parent: any, args: { correo: String, password: String }, context: { db: Db }) => {
        const db = context.db;
        const { correo, password } = args;
        
        const user = await db.collection("Usuarios").findOne({ Email: correo, Password: password });

        if (!user) {
            return new ApolloError("Ningun usuario con ese correo está registrado");

        } else {
            const token = jwt.sign({
                user
            }, 'este-es-el-seed', { expiresIn: '1h' });

            await db.collection("Usuarios").updateOne({ Email: correo, Password: password }, { $set: { token: token } });
            return token;
        }
    },

    logOut: async (parent: any, args: any, context: { db: Db, user: any }) => {
        const { db, user } = context;

        if (!user) {
            throw new ApolloError("User not exist", "USER_NOT_EXIST")
        } else {
            await db.collection("Usuarios").updateOne({ token: user.token.toString()}, { $set: { token: null } });
            return true;
        }
    }
}

