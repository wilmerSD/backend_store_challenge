// services/db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'turntable.proxy.rlwy.net',//'127.0.0.1',//localhost
  port: 37770,
  user: 'root',
  password: 'bQwUFBEguykbBXYUTwyjKHDNxfirnaHF',//''
  database: 'marketChallenge',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
