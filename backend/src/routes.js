import { Router } from 'express';
import db from './database/connection';

const routes = new Router();

routes.get('/', async (req, res) => {

    const tipo = await db('tipo_usuario').select('*');
    
    console.log(tipo);

    return res.json(tipo);
})

export default routes;