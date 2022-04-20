import { ConnectionOptions } from "typeorm";

import { User } from "./models/User";


const connectionOptions: ConnectionOptions = {
    type: 'postgres',
    //url : process.env.DATABASE_URL,
     host: "localhost",
     port: 5432,
     username: "postgres",
   password: "flutter", 
     database: "mansa",
    entities: [User],
    synchronize: true,
    dropSchema: false,
    migrationsRun: true,
    logging: false,
    logger: "simple-console",
   // ssl : true
}


export = connectionOptions;
