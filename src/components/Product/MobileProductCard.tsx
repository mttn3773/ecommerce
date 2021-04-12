import { Flex, Heading, Button, Text, Image } from "@chakra-ui/react";
import React, { useContext } from "react";
import { IProductJSON } from "../../interfaces/product.interface";
import { ACTIONS } from "../../store/Actions";
import { DataContext } from "../../store/GlobalState";

interface MobileProductCardProps {
  product: IProductJSON;
}

export const MobileProductCard: React.FC<MobileProductCardProps> = ({
  product,
}) => {
  const { dispatch } = useContext(DataContext);
  return (
    <Flex
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
      <Flex direction="column" alignItems="center" justifyContent="center">
        <Heading size="md">{product.title}</Heading>
        <Flex justifyContent="center" alignItems="center" gridGap="2rem">
          <Text>{product.price}$</Text>
          <Text>
            {product.inStock ? `In Stock: ${product.inStock}` : "Out of stock"}
          </Text>
        </Flex>
        <Button mb="1rem" as="a" href={`/products/${product._id}`}>
          View Details
        </Button>
        <Button
          mb="1rem"
          onClick={() => {
            dispatch({ type: ACTIONS.ADD_TO_CART, payload: product });
          }}
        >
          ADD TO CART
        </Button>
      </Flex>
    </Flex>
  );
};
