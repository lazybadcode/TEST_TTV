const mysql = require('mysql');
const config = require('config');
const host = config.get('host');
const port = config.get('port');
const user = config.get('user');
const password = config.get('password');
const schema = config.get('schema');

let pool;
const getPool = async () => {
    if (!pool) {
        pool = await poolDB();
    }
    return pool;
};

async function poolDB() {
    try{
      const timeZone = process.env.TIME_ZONE;
      let pool = mysql.createPool({
          connectionLimit: 3,
          host: host,
          port: port,
          user: user,
          password: password,
          database: schema
      });
      
      pool.on('connection', function onConnection(connection) {
          connection.query('SET time_zone = ?', timeZone);
      });
      return pool;
      }
      catch(err){
          console.warn("poolDB", "500", err);
      }
}

module.exports = {getPool: getPool}
    