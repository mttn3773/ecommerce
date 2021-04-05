import { Flex, Heading } from "@chakra-ui/react";
import React, { useContext } from "react";
import { CartItem } from "../components/Cart/CartItem";
import { PaymentButton } from "../components/Stripe/PaymentButton";
import { DataContext } from "../store/GlobalState";
interface CartProps {}

export const Cart: React.FC<CartProps> = ({}) => {
  const { state } = useContext(DataContext);
  const { cart } = state;

  let totalPrice = 0;
  cart.forEach((item) => (totalPrice += item.product.price * item.count));
  return (
    <Flex justifyContent="start">
      <Flex direction="column" w="60%" gridGap="2rem" m="0 auto">
        {cart.map((item) => (
          <CartItem key={item.product._id} item={item} />
        ))}
      </Flex>
      <Flex justifyContent="start" direction="column" w="40%" gridGap="2rem">
        <Heading size="xl" fontWeight="600">
          Total Price:{totalPrice}
        </Heading>
        <PaymentButton />
      </Flex>
    </Flex>
  );
};

export default Cart;
