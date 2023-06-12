import { Db, MongoClient } from "mongodb";

//
// * Clase para conectarnos a la base de datos TFG
//
export const connectDB = async (): Promise<Db> => {
  const dbName: string = "TFG";

  const usr = "gmartinezc4";
  const pwd = "cristiano7";
  const mongouri: string = `mongodb+srv://${usr}:${pwd}@cluster0.ltpbs.mongodb.net/?retryWrites=true&w=majority`;

  const client = new MongoClient(mongouri);
  
  try {
    await client.connect();
    console.info(`MongoDB connected`);
    
    return client.db(dbName);
  } catch (e : any) {
    throw e;
  }
};

