import { createError } from "./../utils/createError";
import { NextApiRequest, NextApiResponse } from "next";
import Category from "../models/Category";
export const createCategory = async (
  req: NextApiRequest,
  _res: NextApiResponse
) => {
  try {
    const { name } = req.body;
    if (!name) return createError({ msg: "Invalid input", param: "name" });
    const newCategory = new Category({ name });
    await newCategory.save();
    return newCategory;
  } catch (error) {
    console.log(error);

    return createError({ msg: "Something went wrong" });
  }
};
