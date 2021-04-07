import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../utils/dbConnect";
import Stripe from "stripe";
import { buffer } from "micro";
import Product from "../../models/Product";
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
      "whsec_mlUAGhuZSN2YoaOJtPUDQjM6jffyNmly",
      60 * 60 * 24
    );
    switch (event.type) {
      case "checkout.session.completed":
        if (!(event as any).data.object.payment_status) {
          return res.json({});
        }
        const listItems = await stripe.checkout.sessions.listLineItems(
          (event as any).data.object.id as string
        );
        listItems.data.forEach(async (item) => {
          const id = item.description.split("id: ")[1];
          const quantity = item.quantity || 0;
          const product = await Product.findById(id);
          if (!product) return;
          await product.updateOne({ inStock: product.inStock - quantity });
        });

        break;
      default:
        return res.json({});
    }
    return res.json({});
  } catch (err) {
    console.log(err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
};
