import { serverCheckAuthorized } from "./../../../utils/checkAuthorized";
import {
  deleteProduct,
  getProductById,
  updateProduct,
} from "./../../../controllers/product.controller";
import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../utils/dbConnect";
import { checkAuthorized } from "../../../utils/checkAuthorized";
import { createError } from "../../../utils/createError";

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      const result = await getProductById(req, res);
      return res.json({ ...result });
    }
    case "PUT": {
      const isAuthorized = serverCheckAuthorized(
        req.headers["authorization"] || ""
      );
      if (!isAuthorized) {
        const error = createError({ msg: "You are not authorized" });
        return res.status(401).json({ ...error });
      }
      const result = await updateProduct(req, res);

      return res.json({ ...result });
    }
    case "DELETE": {
      const result = await deleteProduct(req, res);
      const isAuthorized = checkAuthorized(req);
      if (!isAuthorized) {
        const error = createError({ msg: "You are not authorized" });
        return res.status(401).json({ ...error });
      }
      return res.json({ ...result });
    }
    default:
      break;
  }
};
