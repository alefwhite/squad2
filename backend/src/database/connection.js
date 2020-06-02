import knex from 'knex';
import config from '../../knexfile';

const db = knex(config.development_mysql);

export default db;