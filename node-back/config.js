//db 연결연결하는 곳
const db = {
  database: "sullove",
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "root",
  password: "12345678"
};
const dbPool = require('mysql').createPool(db);

module.exports = dbPool;