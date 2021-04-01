import { createCheckoutSession } from "../../controllers/order.controller";
import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../utils/dbConnect";
import Stripe from "stripe";
dbConnect();

const stripe = new Stripe(process.env.STRIPE_SK!, {
  apiVersion: "2020-08-27",
});
export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req);

  const sig = req.headers["stripe-signature"]!;
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      "1mwhsec_mlUAGhuZSN2YoaOJtPUDQjM6jffyNmly"
    );
    console.log(event);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};
