const { Pool, Client } = require('pg');
const path = require('path');

// // Helper for linking to external query files:
// function sql(file) {
//     const fullPath = path.join(__dirname, file);
//     return new pgp.QueryFile(fullPath, {minify: true});
// }

// // Create a QueryFile globally, once per file:
// const sqlFindUser = sql('./sql/findUser.sql');

// db.one(sqlFindUser, {id: 123})
//     .then(user => {
//         console.log(user);
//     })
//     .catch(error => {
//         if (error instanceof pgp.errors.QueryFileError) {
//             // => the error is related to our QueryFile
//         }
//     });
    
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/rapidRetail';

const client = new Client(connectionString);
client.connect()
  .then(() => console.log('connected'))
  .catch(err => console.error('connection error', err.stack));


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

client.query('SELECT * FROM products WHERE id = 9888888;', (err, res) => {
  console.log('---TESTING---');
  console.log(err, res);
  client.end();
});

// if (err) {
//   console.log('Postgres not initialized');
// } else {
//   console.log('Postgres successfully initialized');
// }