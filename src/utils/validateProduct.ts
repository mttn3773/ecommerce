import { ICreateProduct } from "./../interfaces/product.interface";
import { string, number, array, object, ValidationError } from "yup";
import { isValidObjectId } from "mongoose";

export const validateProduct = (
  product: ICreateProduct
): Promise<{ isValid: boolean; errors?: ValidationError }> => {
  const schema = object().shape({
    title: string().required().min(1).max(32),
    price: number().required(),
    description: string(),
    images: array(),
    category: string()
      .required()
      .test("Invalid Input", (category) => {
        return !!isValidObjectId(category);
      }),
  });
  return schema.validate(product).then(
    () => {
      return { isValid: true };
    },
    (errors) => {
      return { isValid: false, errors };
    }
  );
};
