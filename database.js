import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',   
    host: 'localhost',            
    database: 'postgres',    
    password: 'Sulasalmi231.',    
    port: 5432                   
});

export default pool;
