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
        }, () => {
            console.log("Conexão com mongodb feita com sucesso!");
        });
    }
}

export default new App().server;