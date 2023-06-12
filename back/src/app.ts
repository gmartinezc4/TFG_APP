import { ApolloServer, gql } from "apollo-server"
import { connectDB } from "./connectmongo"
import { typeDefs } from "./schema"
import { Query } from "./resolvers/query"
import { Mutation } from "./resolvers/mutation"


//
// * Clase principal. 
// * Inicializa ApolloServer.
//

const resolvers = {
   Query,
   Mutation
}

const run = async () => {
  const db = await connectDB();
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const token = req.headers.authorization || "";
      const user = await db.collection("Usuarios").findOne({ token });
      
      return { 
        db, 
        user 
      }
    },
  });

  server.listen(4000).then(() => {
    console.log(`Server ready on 4000 `);
  });
}

try {
  run()
} catch (e) {
  console.error(e);
}
