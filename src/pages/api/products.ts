import { dbConnect } from "../../utils/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../models/Product";
import { createProduct } from "../../controllers/product.controller";

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      const products = await Product.find();
      return res.json({ products });
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
