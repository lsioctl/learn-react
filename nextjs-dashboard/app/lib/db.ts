import 'server-only';

import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL || '';

const sql = postgres(DATABASE_URL);

export default sql;