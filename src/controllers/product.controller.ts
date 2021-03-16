import { createError } from "./../utils/createError";
import { validateProduct } from "./../utils/validateProduct";
import { ICreateProduct } from "./../interfaces/product.interface";
import { NextApiRequest, NextApiResponse } from "next";
import Category from "../models/Category";
import Product from "../models/Product";
export const createProduct = async (
  req: NextApiRequest,
  _res: NextApiResponse
) => {
  try {
    const product = req.body as ICreateProduct;
    if (!product) return;
    const { isValid, errors } = await validateProduct(product);
    if (!isValid && errors) {
      const mappedErrors = {
        errors: errors.errors.map((error) => {
          return { msg: error, param: errors.params?.path };
        }),
      };
      return { ...mappedErrors };
    }
    const { category } = product;
    const isExistingCategory = await Category.findById(category.trim());
    if (!isExistingCategory)
      return createError({ msg: "Category doesnt exists", param: "category" });
    const newProduct = await Product.create(product);
    return newProduct;
  } catch (error) {
    console.log(error);

    return createError({ msg: "Something went wrong" });
  }
};
