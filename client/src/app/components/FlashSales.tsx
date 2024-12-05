"use client";
import React from "react";

import joystick from "../../assets/Flash Sales/Joystick.png";
import Image from "next/image";
import keyboard from "../../assets/Flash Sales/keyboard.png";
import monitor from "../../assets/Flash Sales/Monitor.png";
import chair from "../../assets/Flash Sales/Chair.png";
import { Button } from "@/components/ui/button";

const flashSales = [
  {
    src: joystick,
    name: "HAVIT HV-G92 Gamepad",
    price: "120",
    discount: "40%",
  },
  {
    src: keyboard,
    name: "AK-900 Wired Keyboard",
    price: "960",
    discount: "35%",
  },
  {
    src: monitor,
    name: "IPS LCD Gaming Monitor",
    price: "370",
    discount: "30%",
  },
  {
    src: chair,
    name: "S-Series Comfort Chair ",
    price: "375",
    discount: "25%",
  },
  {
    src: chair,
    name: "S-Series Comfort Chair ",
    price: "375",
    discount: "25%",
  },
  {
    src: chair,
    name: "S-Series Comfort Chair ",
    price: "375",
    discount: "25%",
  },
];

const FlashSales = () => {
  return (
    <>
      <div className="mb-10">
        <div className="flex flex-wrap px-12 mb-5  py-12 justify-between gap-10">
          {flashSales.map((sales, index) => (
            <div
              className="h-[320px] w-[500px] border-gray-400 shadow-2xl px-7  py-5
              hover:bg-red-400 hover:text-white cursor-pointer transition-all delay-150 ease-in-out 
              rounded-xl
              "
              key={index}
            >
              <div className="">
                <div className="flex items-center justify-center mt-5 mb-5">
                  <Image src={sales.src} alt={sales.name} />
                </div>
                <div>
                  <p>Discount: {sales.discount}</p>
                </div>
              </div>
              <div>
                <p>Name: {sales.name}</p>
                <p>Price: ${sales.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FlashSales;
