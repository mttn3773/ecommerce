import {
  deleteProduct,
  getProductById,
  updateProduct,
} from "./../../../controllers/product.controller";
import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../utils/dbConnect";

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      const result = await getProductById(req, res);
      return res.json({ ...result });
    }
    case "PUT": {
      const result = await updateProduct(req, res);
      return res.json({ ...result });
    }
    case "DELETE": {
      const result = await deleteProduct(req, res);
      return res.json({ ...result });
    }
    default:
      break;
  }
};
