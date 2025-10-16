import express from "express";
import cors from "cors";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PAYU_KEY = process.env.PAYU_KEY;      // e.g. "FMSlBy"
const PAYU_SALT = process.env.PAYU_SALT;    // e.g. "fiaHxFPmufdFoUTKPGJ6wKWClFCTcY41"
const PAYU_BASE_URL = process.env.PAYU_BASE_URL; // https://test.payu.in for sandbox
const FRONTEND_URL = process.env.FRONTEND_URL;   // http://localhost:5173 or your domain

// Generate txnid helper
const generateTxnId = () =>
  "txn" + Math.floor(Math.random() * 1000000 + 1);

app.post("/api/payment", (req, res) => {
  const { amount, productinfo, firstname, email } = req.body;
  const txnid = generateTxnId();

  // hash sequence => key|txnid|amount|productinfo|firstname|email|udf1|...|udf10|SALT
  const hashString = `${PAYU_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${PAYU_SALT}`;
  const hash = crypto.createHash("sha512").update(hashString).digest("hex");

  const payload = {
    key: PAYU_KEY,
    txnid,
    amount,
    productinfo,
    firstname,
    email,
    phone: "9999999999",
    surl: `${FRONTEND_URL}/payment-success`,
    furl: `${FRONTEND_URL}/payment-failure`,
    hash,
    action: `${PAYU_BASE_URL}/_payment`,
  };

  res.json(payload);
});

app.listen(5000, () =>
  console.log("✅ PayU backend running on http://localhost:5000")
);
