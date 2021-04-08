import { checkAuthorized } from "./../../../utils/checkAuthorized";
import { dbConnect } from "../../../utils/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../models/Product";
import {
  createProduct,
  getProducts,
} from "../../../controllers/product.controller";
import { createError } from "../../../utils/createError";

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      const result = await getProducts(req, res);
      return res.json({ ...result });
    }
    case "POST":
      const isAuthorized = checkAuthorized(req);
      if (!isAuthorized) {
        const error = createError({ msg: "You are not authorized" });
        return res.status(401).json({ ...error });
      }
      const result = await createProduct(req, res);
      return res.json({ ...result });
    case "DELETE":
      await Product.deleteMany();
      return res.json({ msg: "Deleted" });
    default:
      break;
  }
};
