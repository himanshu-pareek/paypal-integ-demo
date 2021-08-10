const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const paypal = require("@paypal/checkout-server-sdk");
const { client } = require("./src/Common/payPalClient");
dotenv.config();

const app = express();

app.use(cors());

app.use("/orders", require("./src/Order/OrderService"));

app.use("/success", async (req, res) => {
    console.log(req.query);
    const request = new paypal.orders.OrdersCaptureRequest(req.query.token);
    request.requestBody({});
    let response = await client().execute(request);
    console.log(JSON.stringify(response, undefined, 4));
    res.send(response);
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is listening on port ${process.env.PORT || 3000}`);
});
