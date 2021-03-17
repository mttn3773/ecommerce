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
    const { category, subcategory } = product;
    const existingCategory = await Category.findOne({
      name: category.trim(),
    });

    if (!existingCategory)
      return createError({ msg: "Category doesnt exists", param: "category" });
    if (
      subcategory &&
      !existingCategory.subcategories.includes(subcategory.trim())
    )
      return createError({
        msg: "Subcategory doesnt exists",
        param: "category",
      });
    const newProduct = new Product({ ...product } as ICreateProduct);
    await newProduct.save();
    return newProduct;
  } catch (error) {
    console.log(error);

    return createError({ msg: "Something went wrong" });
  }
};
