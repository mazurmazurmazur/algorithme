var PORT = process.env.PORT || 5000;
var mailer = require("nodemailer-promise");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

var fs = require("fs");
const stripe = require("stripe")(stripeSecretKey);

var WPAPI = require("wpapi");
var site = new WPAPI({ endpoint: "http://dashboard.algorithme.co/wp-json" });

const express = require("express");

const app = express();

function callback(err) {
  console.log(err);
}

var sendEmail = mailer.config({
  host: "send.one.com",
  auth: {
    user: "noreply@algorithme.co",
    pass: "algoalgo"
  }
});

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

site.myCustomResource = site.registerRoute("wp/v2", "/oxproduct/(?P<id>\\d+)");
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
  fs.writeFile("./temp-prices.json", json, "utf8", callback);
});

app.get("/cart", function(req, res) {
  fs.readFile("temp-prices.json", function(error, data) {
    if (error) {
      res.status(500).end();
    } else {
      res.render("cart.ejs", {
        stripePublicKey: stripePublicKey,
        items: exportData
      });
    }
  });
});

app.post("/purchase", function(req, res) {
  fs.readFile("temp-prices.json", function(error, data) {
    if (error) {
      res.status(500).end();
      console.log(error);
    } else {
      console.log("hej " + req.body.firstname);
      // body: JSON.stringify({
      //   stripeTokenId: token.id,
      //   total: total
      // });
    }
    console.log(req.body.personal);
    stripe.charges
      .create({
        amount: req.body.total * 100,
        source: req.body.stripeTokenId,
        currency: "DKK"
      })
      .then(function() {
        var message = {
          from: "noreply@algorithme.co",
          to: "grzaneczka@gmail.com, " + req.body.email,
          subject: "No Reply- A L G O R I T H M E  Order Details",
          text:
            " Personal Information:  " +
            req.body.personal +
            "  Billing Details:  " +
            req.body.billing +
            +"  Total Paid:  " +
            req.body.total +
            "  Shipping Address:  " +
            req.body.shipping,
          html:
            "<html><body><h2></h2>Thank you for ordering in ALGORITHME!<br/><p><b>Personal Info:</b>  </p> <br/>" +
            req.body.personal +
            "<p> <b>Billing Details:</b>  </p> <br/>" +
            req.body.billing +
            "<p> <b>Total Paid:</b>  </p><br/>" +
            req.body.total +
            "DKK" +
            "<p> <b>Shipping address:</b>  </p><br/> " +
            req.body.shipping +
            "Order Details: " +
            req.body.products +
            "</body></html>"
        };
        console.log("payment successful");
        sendEmail(message)
          .then(function(info) {
            console.log(info);
          }) // if successful
          .catch(function(err) {
            console.log("payment error!!!!!!!!!!");
            console.log(err);
          }); // if an error occurs
      })
      .catch(function() {
        console.log("payment failed");
      });
  });
});

app.listen(PORT);
