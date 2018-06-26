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
  // console.log('look here', req.params.id)
  console.log('GET request... req.url is', req.url);
  db.ProductDetail.find({ id: req.params.id })
    .then((data) => {
      // console.log('YOUR DATA', data);
      // const product = data.slice(0, 1);
      res.send(data);
    }).catch((err) => {
      console.log('CANNOT RETRIEVE FROM DB', err);
    });
});

module.exports = app;
