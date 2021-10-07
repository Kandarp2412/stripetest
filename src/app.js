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

app.get(`/createAccount/:email`, async (req, res) => {
  try {
    let email = req.params.email;
    console.log(email);

    const { email1, name, description } = req.body;

    if (!email) {
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

    return res.redirect(info.url);
    console.log(info);
    res.json({ customerInfo: info, data: customerInfo.id });
  } catch (error) {
    res.json({ messege: error.message, error: error.messege });
  }
});

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_58SS5ICwlvmk5boxy95umA0Daka1Aeur";

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
