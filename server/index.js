// const dotenv = require("dotenv").config();
const stripe = require("stripe")(
  "sk_test_51Kid5YEtOAaRk3yOgNltA0vSUXBIthv99c5a2k5v6YSxAc4lfNV1zroNtPqWsDkp6j5FcOYk9btgiXxfnhbIY5N700ZWgheyaa"
);
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = express.Router();
const uuid = require("uuid");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(router);

router.get("/", (req, res) => {
  res.send("it works fine");
});
router.post("/payment", (req, res) => {
  const { product, token } = req.body;
  const idempotencyKey = uuid.v4();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges
        .create(
          {
            amount: product.price * 100,
            currency: "usd",
            customer: customer.id,
          },
          { idempotencyKey }
        )
        .catch((e) => {
          console.log(e);
        });
    });
});

app.listen("8000", () => {
  console.log("RUNNING ON THE PORT 8000");
});
