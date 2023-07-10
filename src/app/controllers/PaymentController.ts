import { Request, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SEC_KEY as string, {
  apiVersion: "2022-11-15",
  typescript: true,
});

async function createPaymentIntent(req: Request, res: Response) {
  const { amount, customerEmail } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100) || 1099,
      currency: "brl",
      payment_method_types: ["card"],
      capture_method: "automatic",
      receipt_email: customerEmail,
      confirmation_method: "automatic",
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({ clientSecret: clientSecret, success: true });
  } catch (error: any) {
    console.log(error.message);
    res.json({ error: error.message, success: false });
  }
}

export default { createPaymentIntent };
