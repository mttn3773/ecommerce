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
export const addSubcategory = async (
  req: NextApiRequest,
  _res: NextApiResponse
) => {
  try {
    const { category, subcategory } = req.body;
    if (!subcategory)
      return createError({ msg: "Provide name", param: "subcategory" });
    const existingCategory = await Category.findOne({ name: category });
    if (!existingCategory)
      return createError({
        msg: "This category doesnt exists",
        param: "category",
      });
    const newCategory = await existingCategory.updateOne(
      {
        subcategories: [...existingCategory.subcategories, subcategory.trim()],
      },
      { new: true }
    );
    return newCategory;
  } catch (error) {
    console.log(error);

    return createError({ msg: "Something went wrong" });
  }
};
