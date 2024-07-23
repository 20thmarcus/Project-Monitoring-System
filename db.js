import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const config = {
    user: 'marcusfadrigalan',
    password: 'marcus920',
    server: 'LAPTOP-KL4FL4V7', //'172.20.10.7'
    database: 'tuesdayapp',
    options: {
        trustServerCertificate: true,
        trustConnection: false,
        enableArithAbort: true,
        instanceName: 'SQLEXPRESS'
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL');
        return pool;
    })
    .catch(err => {
        console.error('Database connection failed: ', err);
        throw err;
    });

export { sql, poolPromise };