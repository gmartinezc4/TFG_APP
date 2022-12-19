import { ApolloServer, gql } from "apollo-server"
import { connectDB } from "./connectmongo"
import { typeDefs } from "./schema"
import { Query } from "./resolvers/query"
import { Mutation } from "./resolvers/mutation"

const resolvers = {
   Query,
   Mutation
}

const run = async () => {
  const db = await connectDB();
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async () => {
      return {
        db
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
