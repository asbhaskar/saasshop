// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require("stripe")("sk_test_MvxO6Vy0kSE6AlgtUE3tbCnj005jFH2SQ9");

const paymentIntent = await stripe.paymentIntents.create({
  amount: 1,
  currency: "usd",
  // Verify your integration in this guide by including this parameter
  metadata: { integration_check: "accept_a_payment" },
});

const express = require("express");
const app = express();

app.get("/secret", async (req, res) => {
  const intent = res.json({ client_secret: intent.client_secret }); // ... Fetch or create the PaymentIntent
});

app.listen(3000, () => {
  console.log("Running on port 3000");
});

var response = fetch("/secret")
  .then(function (response) {
    return response.json();
  })
  .then(function (responseJson) {
    var clientSecret = responseJson.client_secret;
    // Call stripe.confirmCardPayment() with the client secret.
  });
