const postgres = require('postgres');
require('dotenv').config();

const POSTGRES_URL_DEFAULT = 'postgres://username:password@host:port/database';

const POSTGRES_URL = process.env.POSTGRES_URL || POSTGRES_URL_DEFAULT;

const sql = postgres(POSTGRES_URL);

module.exports = {
    client: { sql }
};
