const { Pool, Client } = require('pg');
const path = require('path');

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/rapidRetail';

const client = new Client(connectionString);
client.connect()
  .then(() => console.log('connected'))
  .catch(err => console.error('connection error', err.stack));

module.exports = client;

// const pool = new Pool({
//   // user: 'postgres',
//   // host: 'localhost',
//   // database: 'rapidRetail',
//   // password: '',
//   // port: 5432,
// });

// pool.query('SELECT * FROM products WHERE id = 9888888;', (err, res) => {
//   console.log(err, res);
//   console.log('select nowww');
//   pool.end();
// });


// client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//   console.log(err ? err.stack : res.rows[0].message); // Hello World!
//   client.end();
// });
