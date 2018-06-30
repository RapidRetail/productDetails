/* eslint comma-dangle: ["error", "only-multiline"] */
/* eslint no-shadow: ["error", { "allow": ["err","data"] }] */

const { Client, Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/rapidRetail';

const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'rapidRetail',
  password: '',
  port: 5432,
  max: 25,
});

const getProductDetails = (productId, callback) => {
  const getMatProductsDetailsQuery = `
  SELECT id, title, price, description, size, fabric, care, features, color
  FROM mat_product_details
  WHERE id = ${productId}`;
  db.query(getMatProductsDetailsQuery, (err, data) => {
    if (err) callback(err, null);
    else if (data.rows.length === 0) {
      const getProductsDetailsQuery = `
      SELECT p.id, p.title, p.price, p.description, p.size, p.fabric, p.care, p.features, array_agg(colors.name) as color
      FROM products as p 
      JOIN products_colors as pc ON p.id = pc.product_id 
      JOIN colors ON colors.id = pc.color_id 
      WHERE p.id = ${productId}
      GROUP BY 1,2,3,4,5,6,7,8;`;
      db.query(getProductsDetailsQuery, (err, data) => {
        if (err) callback(err, null);
        else {
          callback(null, data);
        }
      });
    }
    else {
      callback(null, data);
    }
  });
};

// const db = new Client(connectionString);
// db.connect()
//   .then(() => console.log('connected'))
//   .catch(err => console.error('connection error', err.stack));
// const getProductDetails = (productId, callback) => {
//   const getMatProductsDetailsQuery = `
//   SELECT id, title, price, description, size, fabric, care, features, color
//   FROM mat_product_details
//   WHERE id = ${productId}`;
//   db.query(getMatProductsDetailsQuery, (err, data) => {
//     if (err) callback(err, null);
//     else if (data.rows.length === 0) {
//       const getProductsDetailsQuery = `
//       SELECT p.id, p.title, p.price, p.description, p.size, p.fabric, p.care, p.features, array_agg(colors.name) as color
//       FROM products as p 
//       JOIN products_colors as pc ON p.id = pc.product_id 
//       JOIN colors ON colors.id = pc.color_id 
//       WHERE p.id = ${productId}
//       GROUP BY 1,2,3,4,5,6,7,8;`;
//       db.query(getProductsDetailsQuery, (err, data) => {
//         if (err) callback(err, null);
//         else {
//           callback(null, data);
//         }
//       });
//     }
//     else {
//       callback(null, data);
//     }
//   });
// };

const addProductDetails = (product, callback) => {
  const colorsArray = product.color;
  const selectColorsQuery = `
  SELECT id FROM colors WHERE colors.name IN (
    '${colorsArray[0]}', 
    '${colorsArray[1]}', 
    '${colorsArray[2]}', 
    '${colorsArray[3]}');`;

  // get color ids from colors table for each color in input array, make sure they exist
  db.query(selectColorsQuery, (err, data) => {
    if (err) callback(err, null);
    // if there are not enough colors or there is an invalid color
    else if (data.rows.length !== 4) callback('Error. Invalid Color Detected');
    else {
      const colorIds = data.rows.map(color => color.id);
      const insertProductQuery = `
      INSERT INTO products (title, price, description, size, fabric, care, features) 
      VALUES (
      '${product.title}', 
      '${product.price}', 
      '${product.description}', 
      '{${product.size}}', 
      '${product.fabric}', 
      '${product.care}', 
      '${product.features}')
      RETURNING id`;

      // add product to products table, returning ID of newly inserted row
      db.query(insertProductQuery, (err, data) => {
        if (err) callback(err, null);
        else {
          const rowId = data.rows[0].id;
          const insertProductsColorsQuery = `
          INSERT INTO products_colors (product_id, color_id)
          VALUES 
          (${rowId}, ${colorIds[0]}), 
          (${rowId}, ${colorIds[1]}), 
          (${rowId}, ${colorIds[2]}), 
          (${rowId}, ${colorIds[3]});`;

          // for each color id, add color id and product id to products_colors table
          db.query(insertProductsColorsQuery, (err) => {
            if (err) callback(err);
            else {
              callback(null, 'All inserts successful');
            }
          });
        }
      });
    }
  });
};

module.exports = { getProductDetails, addProductDetails };

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'rapidRetail',
//   password: '',
//   port: 5432,
//   max: 25, 
//   idleTimeoutMillis: 2000
// });
// user: settings.database.username,
// password: settings.database.password,
// host: settings.database.readServer,
// database: settings.database.database,
// max: 25, 
// idleTimeoutMillis: 1000

// pool.query('SELECT * FROM products WHERE id = 9888888;', (err, res) => {
//   console.log(err, res);
//   console.log('select nowww');
//   pool.end();
// });

// db.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//   console.log(err ? err.stack : res.rows[0].message); // Hello World!
//   db.end();
// });
