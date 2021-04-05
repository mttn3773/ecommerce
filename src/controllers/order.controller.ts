import { NextApiRequest, NextApiResponse } from "next";
import { IApiResponse } from "../interfaces/apiResponse.interface";
import { createError } from "../utils/createError";
import { onSuccessResponse } from "../utils/onSuccessResponse";
import Stripe from "stripe";
import { IStripePaymentItem } from "../interfaces/stripePaymentItem.interface";

const stripe = new Stripe(process.env.STRIPE_SK!, {
  apiVersion: "2020-08-27",
});
export const createCheckoutSession = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<IApiResponse> => {
  try {
    const products: IStripePaymentItem[] = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_rates: ["shr_1IctvoHcwfHVdZU7Z0zENUqf"],
      shipping_address_collection: {
        allowed_countries: ["RU"],
      },
      line_items: products,
      mode: "payment",
      success_url: `${process.env.BASE_URL}success`,
      cancel_url: `${process.env.BASE_URL}cancel`,
    });
    return onSuccessResponse({ msg: "Success", data: { id: session.id } });
  } catch (error) {
    console.log(error);

    return createError({
      msg: error.message,
    });
  }
};
