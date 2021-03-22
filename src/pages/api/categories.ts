import { addSubcategory } from "./../../controllers/category.controller";
import { createCategory } from "../../controllers/category.controller";
import { dbConnect } from "../../utils/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import Category from "../../models/Category";
dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      const categories = await Category.find();
      return res.json({ categories });
    case "POST": {
      const result = await createCategory(req, res);
      return res.json({ ...result });
    }
    case "DELETE":
      await Category.deleteMany();
      return res.json({ msg: "Deleted" });
    case "PATCH": {
      const result = await addSubcategory(req, res);
      return res.json({ ...result });
    }
    default:
      break;
  }
};
