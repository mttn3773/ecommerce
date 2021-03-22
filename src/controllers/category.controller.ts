import { onSuccessResponse } from "./../utils/onSuccessResponse";
import { createError } from "./../utils/createError";
import { NextApiRequest, NextApiResponse } from "next";
import Category from "../models/Category";
import { IApiResponse } from "../interfaces/apiResponse.interface";
export const createCategory = async (
  req: NextApiRequest,
  _res: NextApiResponse
): Promise<IApiResponse> => {
  try {
    const { name } = req.body;
    if (!name) return createError({ msg: "Invalid input", param: "name" });
    const newCategory = new Category({ name });
    await newCategory.save();
    return onSuccessResponse({
      msg: "Category created",
      data: { newCategory },
    });
  } catch (error) {
    console.log(error);

    return createError({ msg: "Something went wrong" });
  }
};
export const addSubcategory = async (
  req: NextApiRequest,
  _res: NextApiResponse
): Promise<IApiResponse> => {
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
    await existingCategory.updateOne({
      subcategories: [...existingCategory.subcategories, subcategory.trim()],
    });
    return onSuccessResponse({
      msg: "Subcategory created",
      data: { category, subcategory },
    });
  } catch (error) {
    console.log(error);

    return createError({ msg: "Something went wrong" });
  }
};
