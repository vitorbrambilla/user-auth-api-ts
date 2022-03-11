import { Pool } from 'pg';
import config from 'config';

const connectionString = config.get<string>('database.url');

const db = new Pool({ connectionString });

export default db;
