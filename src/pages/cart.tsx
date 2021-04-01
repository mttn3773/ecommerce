import { Button, Flex, Heading } from "@chakra-ui/react";
import React, { useContext } from "react";
import { CartItem } from "../components/Cart/CartItem";
import { DataContext } from "../store/GlobalState";
import { loadStripe } from "@stripe/stripe-js";
import { request } from "../utils/request";
import { IStripePaymentItem } from "../interfaces/stripePaymentItem.interface";
import { ACTIONS } from "../store/Actions";
interface CartProps {}

export const Cart: React.FC<CartProps> = ({}) => {
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;
  const stripePromise = loadStripe(process.env.STRIPE_PK!);
  const handleClick = async () => {
    const producst: IStripePaymentItem[] = [];
    cart.forEach((item) => {
      const images: string[] = [];
      item.product.images.forEach((image) => images.push(image.url));
      producst.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product.title,
            images,
          },
          unit_amount: item.product.price * 100,
        },
        quantity: item.count,
      });
    });
    const stripe = await stripePromise;
    const response = await request({
      url: "/api/create-checkout-session",
      method: "POST",
      body: producst,
    });
    if (!response.success) {
      return;
    }
    const { id } = response.data;
    const result = await stripe?.redirectToCheckout({
      sessionId: id,
    });
    if (result?.error) {
      dispatch({
        type: ACTIONS.NOTIFY,
        payload: {
          ...state.notify,
          errors: [{ msg: "Payment failded. Please try again later" }],
        },
      });
    }
  };
  let totalPrice = 0;
  cart.forEach((item) => (totalPrice += item.product.price * item.count));
  return (
    <Flex justifyContent="start">
      <Flex direction="column" w="60%" gridGap="2rem" m="0 auto">
        {cart.map((item) => (
          <CartItem key={item.product._id} item={item} />
        ))}
      </Flex>
      <Flex justifyContent="start" direction="column">
        <Heading size="xl" fontWeight="600">
          Total Price:{totalPrice}
        </Heading>
        <Button onClick={handleClick}> PAYMENT </Button>
      </Flex>
    </Flex>
  );
};

export default Cart;
