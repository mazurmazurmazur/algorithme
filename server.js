if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

var fs = require('fs');
const stripe = require('stripe')(stripeSecretKey);

function callback(err) {
  console.log(err);
}

var WPAPI = require('wpapi');
var site = new WPAPI({ endpoint: 'http://dashboard.algorithme.co/wp-json' });

site.myCustomResource = site.registerRoute('wp/v2', '/oxproduct/(?P<id>\\d+)');
var exportData;
site.myCustomResource().get(function(err, data) {
  if (err) {
    console.log(err);
  }

  var obj = {
    table: []
  };
  obj.table.push(data);
  exportData = data;
  var json = JSON.stringify(obj);
  fs.writeFile('./temp-prices.json', json, 'utf8', callback);
});

const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));

app.get('/cart', function(req, res) {
  fs.readFile('temp-prices.json', function(error, data) {
    if (error) {
      res.status(500).end();
    } else {
      res.render('cart.ejs', {
        stripePublicKey: stripePublicKey,
        items: exportData
      });
    }
  });
});

app.post('/purchase', function(req, res) {
  fs.readFile('temp-prices.json', function(error, data) {
    if (error) {
      res.status(500).end();
      console.log(error);
    } else {
      console.log(req.body.total);
      // body: JSON.stringify({
      //   stripeTokenId: token.id,
      //   total: total
      // });
    }
    stripe.charges
      .create({
        amount: req.body.total * 100,
        source: req.body.stripeTokenId,
        currency: 'DKK'
      })
      .then(function() {
        console.log('payment successful');
      })
      .catch(function() {
        console.log('payment failed');
      });
  });
});

app.listen(3000);
