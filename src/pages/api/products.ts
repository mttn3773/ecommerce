import { dbConnect } from "../../utils/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../models/Product";
import {
  createProduct,
  getProducts,
} from "../../controllers/product.controller";

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      const result = await getProducts(req, res);
      return res.json({ ...result });
    }
    case "POST":
      const result = await createProduct(req, res);
      return res.json({ ...result });
    case "DELETE":
      await Product.deleteMany();
      return res.json({ msg: "Deleted" });
    default:
      break;
  }
};
