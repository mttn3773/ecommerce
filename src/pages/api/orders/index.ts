import { createCheckoutSession } from "./../../../controllers/order.controller";
import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../utils/dbConnect";

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST": {
      const result = await createCheckoutSession(req, res);
      return res.json({ ...result });
    }
    default:
      break;
  }
};
