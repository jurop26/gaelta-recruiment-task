import express from "express";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const app = express();
app.use(express.json());

const SHEET_NAME = "Orders";
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID);

const auth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

async function initSheet() {
  await doc.useServiceAccountAuth(auth);
  await doc.loadInfo();
  let sheet = doc.sheetsByTitle[SHEET_NAME];
  if (!sheet) {
    sheet = await doc.addSheet({ title: SHEET_NAME });
  }
  return sheet;
}

app.post("/shoptet-webhook", async (req, res) => {
  try {
    const { event, eventInstance } = req.body;

    if (event !== "order:create") {
      return res.status(200).send("Ignored event");
    }

    const includes =
      "?include=notes,images,shippingDetails,stockLocation,productFlags,paymentTransactions";
    const orderUrl = `https://api.myshoptet.com/api/orders/${eventInstance}${includes}`;

    const response = await fetch(orderUrl, {
      headers: {
        "Content-Type": "application/vnd.shoptet.v1.0",
        "Shoptet-Private-API-Token": process.env.SHOPTET_API_KEY,
      },
    });

    const { data } = await response.json();
    const order = data.order;

    const row = {
      OrderCode: order.code,
      OrderDate: order.creationTime,
      CustomerName: order.billingAddress.fullName,
      CustomerEmail: order.email,
      Products: order.items
        .filter((i) => i.itemType === "product")
        .map((i) => `${i.name} x${i.amount}`)
        .join(", "),
      TotalAmount: order.price.toPay,
      PaymentMethod: order.paymentMethod?.name || "",
      ShippingMethod: order.shipping?.name || "",
      DeliveryName:
        order.deliveryAddress?.fullName || order.billingAddress.fullName,
      DeliveryStreet:
        order.deliveryAddress?.street || order.billingAddress.street,
      DeliveryHouseNumber:
        order.deliveryAddress?.houseNumber || order.billingAddress.houseNumber,
      DeliveryCity: order.deliveryAddress?.city || order.billingAddress.city,
      DeliveryZip: order.deliveryAddress?.zip || order.billingAddress.zip,
      DeliveryCountry:
        order.deliveryAddress?.countryCode || order.billingAddress.countryCode,
      Notes: order.notes?.eshopRemark || "",
      TrackingNumber: order.notes?.trackingNumber || "",
      TrackingURL: order.notes?.trackingUrl || "",
    };

    const sheet = await initSheet();
    await sheet.addRow(row);

    res.status(200).send(`Order added to ${SHEET_NAME} sheet`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error processing webhook");
  }
});

app.listen(5000, () => console.log("Server listening on port 5000"));
