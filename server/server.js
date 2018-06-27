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
  const productId = req.params.id;
  db.getProductDetails(productId, (err, data) => {
    if (err) res.send(err);
    else {
      res.send([data.rows[0]]);
      // done();
    }
  });
});

app.delete('/productDetails/:id', (req, res) => {
  const productId = req.params.id;
  db.deleteProductDetails(productId, (err) => {
    if (err) res.send(err);
    else res.send('delete success');
  });
});


app.post('/productDetails', (req, res) => {
  db.addProductDetails(req.body, (err, data) => {
    if (err) res.send(err);
    else res.send(data);
  });
});


module.exports = app;
