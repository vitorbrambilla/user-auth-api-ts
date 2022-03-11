import { Pool } from 'pg';

const connectionString = 'postgres://azazjtta:a__liJuz46UPNmaufPFxVpHCyKHNcBPP@tuffi.db.elephantsql.com/azazjtta';

const db = new Pool({ connectionString });

export default db;