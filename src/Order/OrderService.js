const express = require("express");
const router = express.Router();

// 1. Set up your server to make calls to PayPal

// 1a. Import the SDK package
const paypal = require('@paypal/checkout-server-sdk');

// 1b. Import the PayPal SDK client that was created in `Set up Server-Side SDK`.
/**
 *
 * PayPal HTTP client dependency
 */
const payPalClient = require('../Common/payPalClient');

// 2. Set up your server to receive a call from the client
const createOrder = async function handleRequest(req, res) {

    console.log("Inside createOrder");

    // 3. Call PayPal to set up a transaction
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
        intent: 'CAPTURE',
        "application_context": {
            "return_url": "http://127.0.0.1:8080/success",
            "cancel_url": "http://127.0.0.1:8080/cancel",
            "brand_name": "Bildemp Inc",
            "locale": "en-US",
        },
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: '20.00'
            }
        }]
    });

    let order;
    try {
        order = await payPalClient.client().execute(request);
    } catch (err) {

        // 4. Handle any errors from the call
        console.error(err);
        return res.send(500);
    }

    console.log(JSON.stringify(order, undefined, 4));

    //   5. Return a successful response to the client with the order ID
    res.status(200).json(order);
};

router.post("/", createOrder);

module.exports = router;
