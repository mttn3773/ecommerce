import { Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { IProductJSON } from "../../interfaces/product.interface";
import { ACTIONS } from "../../store/Actions";
import { DataContext } from "../../store/GlobalState";
interface ProductCardProps {
  product: IProductJSON;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useContext(DataContext);
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
      <Button
        onClick={() => {
          dispatch({ type: ACTIONS.ADD_TO_CART, payload: product });
        }}
      >
        ADD TO CART
      </Button>
    </Flex>
  );
};
