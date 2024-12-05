"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";

interface Props {
  amount: Number;
  id: String;
  name: String;
}

const StripePayement = ({ amount, id, name }: Props) => {
  const makePayement = async () => {
    try {
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
      );
      const body = {
        id,
        amount,
        name,
      };
      const response = await fetch(
        "http://localhost:4000/api/payment/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const { id: sessionId } = await response.json();
      if (sessionId) {
        stripe?.redirectToCheckout({
          sessionId,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button
        className="bg-blue-700 p-5 py-6 hover:bg-blue-800"
        onClick={() => makePayement()}
      >
        Pay through Stripe
      </Button>
    </div>
  );
};

export default StripePayement;
