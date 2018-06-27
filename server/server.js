const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const db = require('../databases/postgres.js');

const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/:id', express.static('public'));
app.use(cors());

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});

app.get('/productDetails/:id', (req, res) => {
  db.query(`SELECT p.id, p.title, p.price, p.description, p.size, p.fabric, p.care, p.features, array_agg(colors.name) as color
  FROM products as p 
  JOIN products_colors as pc ON p.id = pc.product_id 
  JOIN colors ON colors.id = pc.color_id 
  WHERE p.id = ${req.params.id} GROUP BY 1,2,3,4,5,6,7,8;`, (err, data) => {
    if (err) console.log('CANNOT RETRIEVE FROM DB', err);
    else {
      res.send([data.rows[0]]);
      // done();
    }
  });
});

module.exports = app;
