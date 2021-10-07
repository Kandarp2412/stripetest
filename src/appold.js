const express = require("express");
const stripe = require("stripe")(
  "sk_test_51039TY2m5fPKBOnnSsJ9BC9cuxayXSqzDl6yc1wSZxygTDcFKkXyiKUg07hfyWlppzTNi7Zo5uhuQFNs5bjdWp9e00PuryNsxM"
);

const cors = require("cors");
const app = express();
const Users = require("./models/users");
const users = require("./db/user");
var { db } = require("./db/index");
const sequelize = require("sequelize");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cors());

// const https = require("https");

// const standeredAccount = async (email) => {
//   try {
//     const account = await stripe.accounts.create({
//       type: "standard",
//       country: "us",
//       email: email,
//     });
//     return account;
//   } catch (error) {
//     return error.messege;
//   }
// };

// const createAccountLink = async (id) => {
//   let obj = {
//     account: id,
//     refresh_url: "http://128.199.20.60:3000/",
//     return_url: "http://128.199.20.60:3000/",
//     type: "account_onboarding",
//   };

//   try {
//     const accountLinks1 = await stripe.accountLinks.create(obj);
//     return accountLinks1;
//   } catch (error) {
//     return error.messege;
//   }
// };

// https
//   .get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY", (resp) => {
//     let data = "";

//     app.post("/createAccount", async (req, res) => {
//       try {
//         const { email, name, description } = req.body;

//         if (!email || !name || !description) {
//           return res.json({
//             messege: "error",
//             error: "please enter all the required fields",
//           });
//         }

//         let customerInfo = await standeredAccount(email);

//         // console.log(customerInfo);

//         const info = await createAccountLink(customerInfo.id);
//         // console.log("info=>", info);
//         const [userprofile, resultmeta] = await db.sequelize.query(
//           "INSERT INTO users (userId,ConnectedId,charges,payouts) VALUES ('" +
//             customerInfo.id +
//             "','" +
//             info.url +
//             "','0','0')"
//         );

//         // console.log("userprofile", userprofile);

//         // await users.create({
//         //   userId: customerInfo.id,
//         //   connectedId: info.url,
//         //   ...req.body,
//         // });
//         console.log(info);
//         res.json({ customerInfo: info, data: customerInfo.id });
//       } catch (error) {
//         res.json({ messege: error.message, error: error.messege });
//       }
//     });

//     // const standeredAccount = async (email) => {
//     //   try {
//     //     const account = await stripe.accounts.create({
//     //       type: "standard",
//     //       country: "us",
//     //       email: email,
//     //     });
//     //     return account;
//     //   } catch (error) {
//     //     return error.messege;
//     //   }
//     // };

//     // const createAccountLink = async (id) => {
//     //   let obj = {
//     //     account: id,
//     //     refresh_url: "http://128.199.20.60:3000/",
//     //     return_url: "http://128.199.20.60:3000/",
//     //     type: "account_onboarding",
//     //   };

//     //   try {
//     //     const accountLinks1 = await stripe.accountLinks.create(obj);
//     //     return accountLinks1;
//     //   } catch (error) {
//     //     return error.messege;
//     //   }
//     // };
//     // let con;
//     // con.connect(function (err) {
//     //   if (err) throw err;
//     //   console.log("Connected!");
//     //   var sql =
//     //     "INSERT INTO users (userId,ConnectedId,charges,payouts) VALUES ('acct_1Jh7AIFacOB8ZDZa','https://connect.stripe.com/setup/s/l4XVmep7JXC4 ','0','0')";
//     //   con.query(sql, function (err, result) {
//     //     if (err) throw err;
//     //     console.log("Table created");
//     //   });
//     // });
//     // const [userprofile, resultmeta] = sequelize.query(
//     //   "INSERT INTO users (userId,ConnectedId,charges,payouts) VALUES ('acct_1Jh7AIFacOB8ZDZa','https://connect.stripe.com/setup/s/l4XVmep7JXC4 ','0','0')"
//     // );
//     // A chunk of data has been received.
//     resp.on("data", (chunk) => {
//       data += chunk;
//     });

//     // The whole response has been received. Print out the result.
//     resp.on("end", () => {
//       console.log(JSON.parse(data).explanation);
//     });
//   })
//   .on("error", (err) => {
//     console.log("Error: " + err.message);
//   });

let createdAt = Date.now();
let updatedAt = Date.now();

// db();

const standeredAccount = async (email) => {
  try {
    const account = await stripe.accounts.create({
      type: "standard",
      country: "us",
      email: email,
    });
    return account;
  } catch (error) {
    return error.messege;
  }
};

const createAccountLink = async (id) => {
  let obj = {
    account: id,
    refresh_url: "http://128.199.20.60:3000/",
    return_url: "http://128.199.20.60:3000/",
    type: "account_onboarding",
  };

  try {
    const accountLinks1 = await stripe.accountLinks.create(obj);
    return accountLinks1;
  } catch (error) {
    return error.messege;
  }
};

app.post("/createAccount", async (req, res) => {
  try {
    const { email, name, description } = req.body;

    if (!email || !name || !description) {
      return res.json({
        messege: "error",
        error: "please enter all the required fields",
      });
    }

    let customerInfo = await standeredAccount(email);

    // console.log(customerInfo);

    const info = await createAccountLink(customerInfo.id);
    // console.log("info=>", info);
    const [userprofile, resultmeta] = await db.sequelize.query(
      "INSERT INTO users (userId,ConnectedId,charges,payouts) VALUES ('" +
        customerInfo.id +
        "','" +
        info.url +
        "','0','0')"
    );

    // console.log("userprofile", userprofile);

    // await users.create({
    //   userId: customerInfo.id,
    //   connectedId: info.url,
    //   ...req.body,
    // });
    console.log(info);
    res.json({ customerInfo: info, data: customerInfo.id });
  } catch (error) {
    res.json({ messege: error.message, error: error.messege });
  }
});

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_58SS5ICwlvmk5boxy95umA0Daka1Aeur";

app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (request, response) => {
    // const sig = request.headers["stripe-signature"];

    let event = request.body;
    // let data = await event.data.object;

    // let id = request.body.data.object.id;
    // let charges_enabled = request.body.data.object.charges_enabled;
    // let payouts_enabled = request.body.data.object.payouts_enabled;

    // console.log(address1, address2);
    const [userprofile, resultmeta] = await db.sequelize.query(
      "INSERT INTO user_details (userId,charges_enable,payouts_enabled) VALUES ('acct_1JhoJOGhSpByww02','" +
        charges_enabled +
        "','" +
        payouts_enabled +
        "')"
    );
    console.log(event.data.object);

    // try {
    //   event = stripe.webhooks.constructEvent(request.body, endpointSecret);
    // } catch (err) {
    //   response.status(400).send(`Webhook Error: ${err.message}`);
    //   return;
    // }

    // Handle the event
    // console.log(event.event);
    switch (event) {
      case "account.updated":
        const account = event.data.object;
        // Then define and call a function to handle the event account.updated
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.json({ data: event.data.object });
  }
);

app.listen(4000, (re, err) => {
  if (err) console.log(err);
  console.log("running on http://localhost:4000");
  // db.sequelize.authenticate();
  db.sequelize
    .sync({ alter: true })
    .then(() => {
      console.log("database Connected");
    })
    .catch((err) => {
      console.log(err);
    });
});
