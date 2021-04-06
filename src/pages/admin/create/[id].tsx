import { GetServerSideProps } from "next";
import React from "react";
import { ProductForm } from "../../../components/Form/ProductForm";
import {
  ICreateProduct,
  IProductJSON,
} from "../../../interfaces/product.interface";
import { request } from "../../../utils/request";

interface UpdateProductProps {
  product: IProductJSON;
  id: string;
}

export const UpdateProduct: React.FC<UpdateProductProps> = ({
  product,
  id,
}) => {
  const initialValues: ICreateProduct = {
    category: product.category,
    price: product.price,
    title: product.title,
    description: product.description,
    subcategory: product.subcategory,
    inStock: product.inStock,
  };
  const images = product.images;
  return (
    <ProductForm
      updating={id}
      initialValues={initialValues}
      existingImages={images}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;
  if (!id) return { props: { product: null } };
  const response = await request({
    url: `${process.env.BASE_URL}api/products/${id}`,
  });
  if (!response.success) return { props: { product: null } };
  const { data } = response;
  const { product } = data;
  return { props: { product, id } };
};

export default UpdateProduct;
