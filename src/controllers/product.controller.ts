import { NextApiRequest, NextApiResponse } from "next";
import Category from "../models/Category";
import Product from "../models/Product";
import { applyQueryFeatures } from "../utils/createQuery";
import { IApiResponse } from "./../interfaces/apiResponse.interface";
import { IError } from "./../interfaces/error.interface";
import { ICreateProduct, IProduct } from "./../interfaces/product.interface";
import { createError } from "./../utils/createError";
import { onSuccessResponse } from "./../utils/onSuccessResponse";
import { validateProduct } from "./../utils/validateProduct";

export const getProductById = async (
  req: NextApiRequest,
  _res: NextApiResponse
): Promise<IApiResponse> => {
  try {
    const { query } = req;
    const { id } = query;
    const product = await Product.findById(id);
    if (!product) return createError({ msg: "Couldn't find product" });
    return onSuccessResponse({ msg: "Product", data: { product } });
  } catch (error) {
    console.log(error);

    return createError({ msg: "Something went wrong" });
  }
};
export const getProducts = async (
  req: NextApiRequest,
  _res: NextApiResponse
): Promise<IApiResponse> => {
  try {
    const { query } = req;

    const { data, count } = await applyQueryFeatures<IProduct>(Product, query);
    return { success: true, data: { products: data, count } };
  } catch (error) {
    console.log(error);

    return createError({ msg: "Something went wrong" });
  }
};
export const updateProduct = async (
  req: NextApiRequest,
  _res: NextApiResponse
): Promise<IApiResponse> => {
  try {
    const product = req.body as ICreateProduct;
    if (!product) return createError({ msg: "Something went wrong" });
    const { id } = req.query;
    if (!id) return createError({ msg: "Something went wrong" });
    const existingProduct = await Product.findById(id);
    if (!existingProduct)
      return createError({ msg: "Couldnt find this product" });
    const { isValid, errors } = await validateProduct(product);
    if (!isValid && errors) {
      const mappedErrors = {
        errors: errors.errors.map(
          (error): IError => {
            return {
              msg: error,
              param: errors.params ? (errors.params.path as string) : undefined,
            };
          }
        ),
      };
      return { success: false, ...mappedErrors };
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
    const newProduct = await existingProduct.updateOne(product, { new: true });
    return onSuccessResponse({
      msg: "Product updated",
      data: { product: newProduct },
    });
  } catch (error) {
    console.log(error);

    return createError({ msg: "Something went wrong" });
  }
};
export const createProduct = async (
  req: NextApiRequest,
  _res: NextApiResponse
): Promise<IApiResponse> => {
  try {
    const product = req.body as ICreateProduct;
    if (!product) return createError({ msg: "Something went wrong" });

    const { isValid, errors } = await validateProduct(product);
    if (!isValid && errors) {
      const mappedErrors = {
        errors: errors.errors.map(
          (error): IError => {
            return {
              msg: error,
              param: errors.params ? (errors.params.path as string) : undefined,
            };
          }
        ),
      };
      return { success: false, ...mappedErrors };
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
    const newProduct = new Product({
      ...product,
      category: category.toLowerCase(),
      subcategory: subcategory?.toLowerCase() || "",
    } as ICreateProduct);
    await newProduct.save();
    return onSuccessResponse({ msg: "Product created", data: { newProduct } });
  } catch (error) {
    console.log(error);

    return createError({ msg: "Something went wrong" });
  }
};
export const deleteProduct = async (
  req: NextApiRequest,
  _res: NextApiResponse
): Promise<IApiResponse> => {
  try {
    const { id } = req.query;
    const product = await Product.findById(id);
    if (!product) return createError({ msg: "Couldn't find this product" });
    const result = await product.delete();
    return onSuccessResponse({ msg: "Product deleted", data: { result } });
  } catch (error) {
    console.log(error);
    return createError({ msg: "Something went wrong" });
  }
};
