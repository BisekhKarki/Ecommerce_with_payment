"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import khalti from "@/assets/Khalti.png";
import Image from "next/image";

interface Props {
  amount: Number;
  id: String;
  name: String;
}

const KhaltiPayment = ({ amount, id, name }: Props) => {
  const payment = async () => {
    try {
      const respone = await fetch("http://localhost:4000/api/payment/khalti", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
        }),
      });
      const url = await respone.json();
      if (url.success) {
        window.location.href = url.message;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button
        onClick={() => payment()}
        className="bg-purple-800 p-5 py-6 hover:bg-purple-900"
      >
        Pay through Khalti
      </Button>
    </div>
  );
};

export default KhaltiPayment;
