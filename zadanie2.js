import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import  express from require("express");

const app = express();

app.use(express.json());

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID);
const auth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

async function initSheet() {
  await doc.useJwtAuth(auth);
  await doc.loadInfo();

  return doc.sheetsByIndex[0];
}

app.post("/shoptet-webhook", async (req, res) => {
  const { event, eventInstance } = req.body;

  if (event === "order:create") {
    const orderCode = eventInstance;
    const includes =
      "?include=notes,images,shippingDetails,stockLocation,productFlags,paymentTransactions";
    const orderUrl =
      "https://api.myshoptet.com/api/orders/" + orderCode + includes;

    const response = await fetch(orderUrl, {
      headers: {
        "Content-Type": "application/vnd.shoptet.v1.0",
        "Shoptet-Private-API-Token": "apikey",
      },
    });
    const { data } = await response.json();
    const order = data.order;

    const row = {
      OrderCode: order.code,
      CustomerName: order.billingAddress.fullName,
      CustomerEmail: order.email,
      Products: order.items
        .filter((item) => item.itemType === 'product')
        .map((item) => `${item.name} x${item.amount}`)
        .join(', '),
      TotalAmount: order.price.toPay,
      OrderDate: order.creationTime,
    };

    const sheet = await initSheet();
    await sheet.addRow(row);
  }

});

app.listen(5000, () => console.log("Server listen on 5000"));
