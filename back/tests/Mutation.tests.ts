import { calcularFechaRecogida } from '../src/resolvers/mutation';
import { Mutation }  from '../src/resolvers/mutation';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient, Db, Collection } from 'mongodb';
import { connectDB } from '../src/connectmongo';


describe('calcularFechaRecogida', () => {
  it('debería devolver una fecha válida', () => {
    // Arrange
    // Se puede configurar cualquier fecha de prueba para el cálculo de entrega aquí
    const fechaPrueba = new Date('2023-06-01');

    // Act
    const resultado = calcularFechaRecogida();

    // Assert
    expect(resultado).to.be.a('string');
    expect(resultado).to.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/);
    
  });
});


// describe('venderProductos', () => {
//   let mongoServer: MongoMemoryServer;
//   let db: Db;
//   let collection: Collection<any>;

//   before(async () => {
//     mongoServer = new MongoMemoryServer();
//     const mongoUri = await mongoServer.getUri();
//     const client = new MongoClient(mongoUri);
//     await client.connect();
//     db = client.db();
//     collection = db.collection('nombre-de-la-coleccion');
//   });

//   after(async () => {
//     await mongoServer.stop();
//   });

//   it('debería vender productos correctamente', async () => {
//     // Aquí puedes realizar las pruebas de la función venderProductos utilizando la instancia de base de datos en memoria
//     // Asegúrate de insertar datos de prueba en la colección antes de ejecutar la función y verificar los resultados esperados

//     // Ejemplo:
//     const args = {
//       nombre: 'John',
//       apellido: 'Doe',
//       correo: 'john@example.com',
//       telefono: '123456789',
//       direccion: '123 Calle Principal',
//       masInformacion: 'Detalles adicionales',
//       codigoPostal: '12345',
//       ciudad: 'Ciudad',
//       pais: 'País',
//     };

//     const db = await connectDB();

//     const context = {
//       db,
//       user: {
//         _id: '123456789',
//       },
//     };
//     const result = await Mutation.venderProductos(parent, args, context);

//     // Verifica los resultados esperados
//     expect(result).to.deep.equal({
//       id_user: '123456789',
//       estado: 'Activo',
//       nombre: 'John',
//       apellido: 'Doe',
//       correo: 'john@example.com',
//       telefono: '123456789',
//       direccion: '123 Calle Principal',
//       masInformacion: 'Detalles adicionales',
//       codigoPostal: '12345',
//       ciudad: 'Ciudad',
//       pais: 'País',
//       fechaPedido: '31/05/2023',
//       fechaRecogida: '02/06/2023',
//       importePedido: 100.0,
//       importeFreeIvaPedido: 85.0,
//     });
//   });
// });
