import { Button } from "@chakra-ui/react";
import { loadStripe } from "@stripe/stripe-js";
import React, { useContext } from "react";
import { IStripePaymentItem } from "../../interfaces/stripePaymentItem.interface";
import { ACTIONS } from "../../store/Actions";
import { DataContext } from "../../store/GlobalState";
import { request } from "../../utils/request";

interface PaymentButtonProps {}

export const PaymentButton: React.FC<PaymentButtonProps> = ({}) => {
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
            name: item.product.title + `: ${item.product._id}`,
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
      return dispatch({
        type: ACTIONS.NOTIFY,
        payload: {
          ...state.notify,
          errors: [
            {
              msg: response.errors
                ? response.errors[0].msg
                : "Payment failded. Please try again later",
            },
          ],
        },
      });
    }
    const { id } = response.data;
    const result = await stripe?.redirectToCheckout({
      sessionId: id,
    });

    if (result?.error) {
      console.log(result?.error);

      dispatch({
        type: ACTIONS.NOTIFY,
        payload: {
          ...state.notify,
          errors: [{ msg: "Payment failded. Please try again later" }],
        },
      });
    }
  };

  return (
    <Button w="50%" m="0 auto" onClick={handleClick}>
      PAYMENT
    </Button>
  );
};
