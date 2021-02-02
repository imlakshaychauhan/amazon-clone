const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")
('sk_test_51IE9CMK7w0fZQidOLGP2ba5d5zkEnV1StTe99lNi3qWKspGHU1P7r5mFoomFKRyOxNTBWoWuBBgK0Rq7lZpKf5Su00DOARaAtm')

// api


// App config
const app = express();

// middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// api routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
    const total = request.query.total;

    console.log('Payment Request Recieved for this amount', total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    });
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});
// listen command
exports.api = functions.https.onRequest(app);

// example endpoint
// http://localhost:5001/clone-922b1/us-central1/api

