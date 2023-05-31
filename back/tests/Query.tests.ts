import { expect } from "chai";
import { ApolloError, ApolloServer, gql } from "apollo-server";
import { Db, MongoClient, Collection, ObjectId } from "mongodb";
import { describe, it } from 'mocha';


describe("Query - getMaderas", () => {
    let server: ApolloServer;
    let db: Db;
    let maderasCollection: Collection<any>;
  
    before(async () => {
      const dbName: string = "TFG";
      const usr = "gmartinezc4";
      const pwd = "cristiano7";
      const mongouri: string = `mongodb+srv://${usr}:${pwd}@cluster0.ltpbs.mongodb.net/?retryWrites=true&w=majority`;
  
      const client = new MongoClient(mongouri);
  
      try {
        await client.connect();
        console.info("MongoDB connected");
  
        db = client.db(dbName);
        maderasCollection = db.collection("Tipos_Madera");
      } catch (e) {
        console.error(e);
        throw new Error("Fallo al conectarse a la base de datos");
      }
  
      const typeDefs = gql`
        type Madera {
          nombre: String
        }
  
        type Query {
          getMaderas: [Madera]
        }
      `;
  
      const resolvers = {
        Query: {
          getMaderas: async () => {
            const maderas = await maderasCollection.find().toArray();
  
            if (maderas.length > 0) {
              return maderas;
            } else {
              throw new ApolloError("No hay maderas", "403");
            }
          },
        },
      };
  
      server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async () => {
          return { db };
        },
      });
    });
  
    after(async () => {
      await server.stop();
    });
  
    it("devería devolver un array de maderas", async () => {
      // Insertar datos de prueba en la colección de maderas
      await maderasCollection.insertMany([
        { nombre: "Madera 1" },
        { nombre: "Madera 2" },
      ]);
  
      // Ejecutar una consulta a través del servidor Apollo Server
      const query = gql`
        query {
          getMaderas {
            nombre
          }
        }
      `;
      const response = await server.executeOperation({ query });
  
      // Comprobar que se devuelve un array con al menos una madera
      expect(response.data?.getMaderas).to.be.an("array").that.is.not.empty;
    });
  
    it("debería lanzar un ApolloError si no hay maderas", async () => {
      // Vaciar la colección de maderas
      await maderasCollection.deleteMany({});
  
      // Ejecutar una consulta a través del servidor Apollo Server
      const query = gql`
        query {
          getMaderas {
            nombre
          }
        }
      `;
      const response = await server.executeOperation({ query });
  
      // Comprobar que se lanza un ApolloError con el mensaje y el código de error adecuados
      expect(response.errors?.[0].message).to.equal("No hay maderas");
      expect(response.errors?.[0].extensions?.code).to.equal("403");
    });
  });


  describe("Query - getProductos", () => {
    let server: ApolloServer;
    let db: Db;
    let productosCollection: Collection<any>;
  
    before(async () => {
      const dbName: string = "TFG";
      const usr = "gmartinezc4";
      const pwd = "cristiano7";
      const mongouri: string = `mongodb+srv://${usr}:${pwd}@cluster0.ltpbs.mongodb.net/?retryWrites=true&w=majority`;
  
      const client = new MongoClient(mongouri);
  
      try {
        await client.connect();
        console.info("MongoDB connected");
  
        db = client.db(dbName);
        productosCollection = db.collection("Productos_Venta");
      } catch (e) {
        console.error(e);
        throw new Error("Fallo al conectarse a la bbdd");
      }
  
      const typeDefs = gql`
        type Producto {
          nombre: String
        }
  
        type Query {
          getProductos: [Producto]
        }
      `;
  
      const resolvers = {
        Query: {
          getProductos: async () => {
            try {
              const productos = await productosCollection.find().toArray();
  
              if (productos.length > 0) {
                return productos;
              } else {
                throw new ApolloError("No hay productos", "403");
              }
            } catch (e: any) {
              throw new ApolloError(e.message, e.extensions.code);
            }
          },
        },
      };
  
      server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async () => {
          return { db };
        },
      });
    });
  
    after(async () => {
      await server.stop();
    });
  
    it("Debería devolver un array de productos", async () => {
      // Insertar datos de prueba en la colección de productos
      await productosCollection.insertMany([
        { nombre: "Producto 1" },
        { nombre: "Producto 2" },
      ]);
  
      // Ejecutar una consulta a través del servidor Apollo Server
      const query = gql`
        query {
          getProductos {
            nombre
          }
        }
      `;
      const response = await server.executeOperation({ query });
  
      // Comprobar que se devuelve un array con al menos un producto
      expect(response.data?.getProductos).to.be.an("array").that.is.not.empty;
    });
  
    it("debería lanzar un ApolloError si no hay productos", async () => {
      // Vaciar la colección de productos
      await productosCollection.deleteMany({});
  
      // Ejecutar una consulta a través del servidor Apollo Server
      const query = gql`
        query {
          getProductos {
            nombre
          }
        }
      `;
      const response = await server.executeOperation({ query });
  
      // Comprobar que se lanza un ApolloError con el mensaje y el código de error adecuados
      expect(response.errors?.[0].message).to.equal("No hay productos");
      expect(response.errors?.[0].extensions?.code).to.equal("403");
    });
  });
  