import { Flex, Heading, Text, Image } from "@chakra-ui/react";
import React from "react";
import { IProductJson } from "../../interfaces/product.interface";
interface ProductCardProps {
  product: IProductJson;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      border="1px solid"
      borderColor="gray.200"
      overflow="hidden"
      borderRadius="12px"
    >
      <Image
        objectFit="cover"
        w="100%"
        h="400px"
        src={
          product.images[0]
            ? product.images[0].url
            : "https://via.placeholder.com/200x400"
        }
      />
      <Heading size="md">{product.title}</Heading>
      <Flex justifyContent="center" alignItems="center" gridGap="2rem">
        <Text>{product.price}$</Text>
        <Text>
          {product.inStock ? `In Stock: ${product.inStock}` : "Out of stock"}
        </Text>
      </Flex>
    </Flex>
  );
};
