//Database connection file
const pg = require('pg');
const Pool = pg.Pool;
const config = {
    database: 'ToDoApp',
    host: 'localhost',
    port: 5432,
    Max: 10, //how many concurrent connections allowed. 
    idleTimeoutMillis: 5000 // 5 seconds.
}
//create an instance of the pool object

const pool = new Pool(config);  

module.exports = pool;