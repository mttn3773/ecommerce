import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { IProductJSON } from "../../interfaces/product.interface";
import { request } from "../../utils/request";

interface ProductDetailsProps {
  product: IProductJSON;
}

export const ProductDetails: NextPage<ProductDetailsProps> = ({ product }) => {
  return <>{JSON.stringify(product)}</>;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;
  if (!id) return { props: { product: {} } };
  const product = await request({
    url: `${process.env.BASE_URL}api/products/${id}`,
  });
  return { props: { product } };
};

export default ProductDetails;
