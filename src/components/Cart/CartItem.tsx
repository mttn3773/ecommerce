import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef } from "react";
import { ICartItem } from "../../interfaces/rootState.interface";
import Image from "next/image";
import { toCapitalize } from "../../utils/toCapitalize";
import { DataContext } from "../../store/GlobalState";
import { IProductJSON } from "../../interfaces/product.interface";
import { ACTIONS } from "../../store/Actions";

interface CartItemProps {
  item: ICartItem;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { dispatch } = useContext(DataContext);
  const { product, count } = item;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleRemoveItem = (product: IProductJSON) => {
    return dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: product });
  };
  const handleAddItem = (product: IProductJSON) => {
    return dispatch({ type: ACTIONS.ADD_TO_CART, payload: product });
  };
  useEffect(() => {
    inputRef.current ? (inputRef.current.value = count.toString()) : "";
  }, [count]);
  return (
    <Flex
      gridGap="2rem"
      border="1px solid"
      borderColor="blackAlpha.300"
      borderRadius="8px"
      w="60%"
      p="2rem"
    >
      <Image
        src={product.images[0].url || "https://via.placeholder.com/200x400"}
        height="350px"
        width="200px"
      />
      <Flex direction="column" justifyContent="space-between">
        <Flex direction="column">
          <Heading size="md" color="blackAlpha.900">
            {product.title}
          </Heading>
          <Text color="blackAlpha.600">
            {toCapitalize(product.category)}
            {product.subcategory
              ? ", " + toCapitalize(product.subcategory)
              : ""}
          </Text>
        </Flex>
        <Flex direction="column">
          <Flex>
            <Button onClick={() => handleRemoveItem(product)}>-</Button>
            <Input ref={inputRef} defaultValue={count} w="5rem" />
            <Button onClick={() => handleAddItem(product)}>+</Button>
          </Flex>
          <Text color="blackAlpha.900">Price: {product.price * count}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
