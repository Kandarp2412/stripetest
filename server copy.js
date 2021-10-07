// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js

const stripe = require("stripe")(
  "sk_test_51039TY2m5fPKBOnnSsJ9BC9cuxayXSqzDl6yc1wSZxygTDcFKkXyiKUg07hfyWlppzTNi7Zo5uhuQFNs5bjdWp9e00PuryNsxM"
);
const express = require("express");
const app = express();
const cors = require("cors");
var { db } = require("./src/db/index");
const sequelize = require("sequelize");
const bodyParser = require("body-parser");

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_c3otQXEra9PfPqbqiJwxLklnhuneICu1";

app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "account.updated":
        const account = event.data.object;
        console.log(event.data);
        const [userprofile, resultmeta] = await db.sequelize.query(
          "INSERT INTO user_details (userId) VALUES ('" + account + "')"
        );
        // Then define and call a function to handle the event account.updated
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

app.listen(4242, () => console.log("Running on port 4242"));
