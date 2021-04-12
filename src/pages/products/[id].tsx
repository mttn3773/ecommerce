import { Button } from "@chakra-ui/button";
import { Flex, Heading, Text } from "@chakra-ui/layout";
import { GetServerSideProps, NextPage } from "next";
import React, { useContext } from "react";
import { ImagesList } from "../../components/Product/Details/ImagesList";
import { IProductJSON } from "../../interfaces/product.interface";
import { ACTIONS } from "../../store/Actions";
import { DataContext } from "../../store/GlobalState";
import { request } from "../../utils/request";
import { toCapitalize } from "../../utils/toCapitalize";

interface ProductDetailsProps {
  product: IProductJSON;
}

export const ProductDetails: NextPage<ProductDetailsProps> = ({ product }) => {
  const { dispatch } = useContext(DataContext);
  const handleAddToCart = (product: IProductJSON) => {
    dispatch({ type: ACTIONS.ADD_TO_CART, payload: product });
  };
  if (!product) {
    return (
      <Flex w="60%" m="0 auto" textAlign="center">
        <Heading size="2xl" fontWeight="600">
          Couldn't find this product
        </Heading>
      </Flex>
    );
  }
  return (
    <Flex w="80%" m="0 auto" gridGap="3rem" mt="3rem">
      <ImagesList images={product.images} />
      <Flex direction="column" gridGap="1rem">
        <Heading size="xl"> {product.title}</Heading>
        <Text color="gray.500" size="lg">
          {toCapitalize(product.category)}
          {product.subcategory ? ", " + toCapitalize(product.subcategory) : ""}
        </Text>
        <Flex gridGap="2rem">
          <Text color="red.400" fontWeight="600">
            {product.price}$
          </Text>
          <Text color="red.400" fontWeight="600">
            {product.inStock ? product.inStock : "Out of stock"}
          </Text>
        </Flex>
        <Text fontStyle={product.description ? "" : "italic"}>
          {product.description ? product.description : "No description..."}
        </Text>
        <Button onClick={() => handleAddToCart(product)}>ADD TO CART</Button>
      </Flex>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const { id } = query;
  if (!id) return { props: { product: null } };
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const baseUrl = `${protocol}://${host}/api`;
  const response = await request({
    url: `${baseUrl}/products/${id}`,
  });
  if (!response.success) return { props: { product: null } };
  const { data } = response;
  const { product } = data;
  return { props: { product } };
};

export default ProductDetails;
