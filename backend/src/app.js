import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import mongoose from 'mongoose';
import { resolve } from 'path';

class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.mongo();
        this.routes();
    }
    
    middlewares() {
        this.server.use(cors({
            "origin": "*",
            "exposedHeaders": ['Authorization', 'X-Total-Count'], 
            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            "preflightContinue": false,
            "optionsSuccessStatus": 204
        }));
        this.server.use(express.json());
        this.server.use('/uploadusuario', express.static(resolve(__dirname, "..", "tmp", "uploads")));
    }

    routes() {
        this.server.use(routes);
    }

    mongo() {
        this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Conexão com MongoDB realizado com sucesso!");
        })
        .catch((error) => {
            console.log("Error: Conexão com MongoDB não realizado com sucesso!" + error);
        });
    }
}

export default new App().server;