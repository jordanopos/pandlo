import "reflect-metadata";
import { ConnectionOptions, createConnection } from "typeorm";
import config from "./ormconfig";
import express from "express"
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from './resolvers/UserResolver';
import storageRouter from "./routes/storage.routes";
const cors = require("cors");
require("dotenv").config()

async function main() {
    await createConnection(config as ConnectionOptions).then((connection) => {
        if (connection.isConnected) {
            console.log("🚀 is a goo")
        }
    })

    const schema = await buildSchema({
        resolvers: [
            UserResolver
        ]

    });
    const server = new ApolloServer({
        schema,
        debug: false,
        introspection: true,
        context: ({ req, res }) => ({ req, res })

    })

    await server.start()

    const app = express()

    app.use(cors({
        origin: "*"
    }))
    app.get("/", (req, res) => {
        return res.send(`${__dirname}`)
    })
    app.use('/storage', storageRouter)


    server.applyMiddleware({ app })

    app.listen({ port: process.env.PORT || 4000 }, () =>
        console.log(`🚀 Server is ready`)
    );
}

main();
