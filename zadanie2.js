const express = require("express");
const app = express();

app.use(express.json());

app.post("/shoptet-webhook", async (req, res) => {
  const { event, eventInstance } = req.body;

  if (event === "order:create") {
    const orderCode = eventInstance;
    const includes =
      "?include=notes,images,shippingDetails,stockLocation,productFlags,paymentTransactions";
    const orderUrl =
      "https://api.myshoptet.com/api/orders/" + orderCode + includes;

    const res = await fetch(orderUrl, {
      headers: {
        "Content-Type": "application/vnd.shoptet.v1.0",
        "Shoptet-Private-API-Token": "apikey",
      },
    });
    const order = await res.json();
  }
});

app.listen(5000, () => console.log("Server listen on 5000"));
