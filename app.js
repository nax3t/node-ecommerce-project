// dot env
require('dotenv').config();

const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;
const express = require("express");
const app = express();
const stripe = require("stripe")(keySecret);
const engine = require('ejs-mate');
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// use ejs-locals for all ejs templates: 
app.engine('ejs', engine);

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) =>
  res.render("index", {keyPublishable: keyPublishable}));

app.post("/charge", (req, res) => {
  let amount = 500;
  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Sample Charge",
         currency: "usd",
         customer: customer.id
    }))
  .then(charge => res.render("charge"));
});

app.listen(3000, () => {
	console.log('Server running, listening on port 3000');
});