import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url";
import { createServer } from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@as-integrations/express5";

import {typeDefs} from "./typeDefs.ts";
import {resolvers} from "./resolvers.ts";

interface MyContext {
  token?: string;
}

const app = express();
const httpSvr = createServer(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, ".env") });

// MIDDLEWARE
app.use(
  cors({
    origin: "http://localhost:5173", // confirm this is your actual Vite port
    credentials: true,
  })
);

// everything else (GraphQL) parses as normal JSON
app.use(express.json());

//graphql
const apolloSvr = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer: httpSvr })]
});
await apolloSvr.start();

//connecting apollo to express
//"mounting the graphql endpoint at /graphql"
app.use(
    '/graphql',
    expressMiddleware(apolloSvr, {
        context: async ({ req }) => ({ //this function applies this info to all resolvers
            token: req.headers.authorization
        }),
    }),
);

//starting the 
const PORT = process.env.GRAPHQL_PORT;
httpSvr.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}`);
    console.log(`GraphQL endpoint ready at http://localhost:${PORT}/graphql`);
});