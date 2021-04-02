import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../utils/dbConnect";
import Stripe from "stripe";
import { buffer } from "micro";
dbConnect();
export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SK!, {
  apiVersion: "2020-08-27",
});
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"]!;
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      "whsec_mlUAGhuZSN2YoaOJtPUDQjM6jffyNmly"
    );
    console.log(event);
  } catch (err) {
    console.log(err);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};
