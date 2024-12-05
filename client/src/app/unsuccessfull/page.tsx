"use client";
import React from "react";
import unsuccess from "@/assets/Unsuccessfulpayment.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Unsuccessfulpayment = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col justify-center items-center rounded bg-gray border-gray-800 px-10 py-20 m-10 w-3/4 gap-2 shadow-2xl">
        <h1 className="text-4xl font-bold">Error</h1>
        <div className=" flex flex-col justify-center items-center">
          <Image src={unsuccess} alt="Correct" />
          <div className="flex flex-col justify-center items-center">
            <h2 className="font-bold text-2xl m-2">Purchased Failed</h2>
            <p className="m-1 text-gray-400">
              Something went wrong. Please try again in few seconds
            </p>
          </div>
        </div>
        <Button onClick={() => router.push("/")}>Back to Home</Button>
      </div>
    </div>
  );
};

export default Unsuccessfulpayment;
