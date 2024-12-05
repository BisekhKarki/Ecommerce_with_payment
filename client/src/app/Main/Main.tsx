import React from "react";
import { FaLeftLong, FaRightLong } from "react-icons/fa6";
import FlashSales from "../components/FlashSales";
import { useSession } from "next-auth/react";
import Categories from "./components/Categories";
import Products from "../components/Products";

const Main = () => {
  const { data: session } = useSession();
  const day = new Date().getDay().toLocaleString();
  const hours = new Date().getHours().toLocaleString();
  const minutes = new Date().getMinutes().toLocaleString();
  const seconds = new Date().getSeconds().toLocaleString();

  return (
    <div>
      {" "}
      <div className="flex items-center gap-3 p-12">
        <div className="w-4 bg-red-500 h-12 rounded-sm" />
        <div>
          <p className="text-red-700 font-semibold">Today's</p>
        </div>
      </div>
      <div className="flex gap-2 text-center justify-between px-12 items-center">
        <div className="flex gap-10">
          <p className="text-4xl font-bold text-center">Flash Sales</p>
          <div className="flex gap-4 ">
            <p>
              <span className="text-xs text-gray-500">Days</span>
              <br />
              <span className="text-black font-bold text-2xl">0{day}</span>
            </p>
            <p>
              <span className="text-xs text-gray-500">Hours</span>
              <br />
              <span className="text-black font-bold text-2xl">{hours}</span>
            </p>
            <p>
              <span className="text-xs text-gray-500">minutes</span>
              <br />
              <span className="text-black font-bold text-2xl">{minutes}</span>
            </p>
            <p>
              <span className="text-xs text-gray-500">Seconds</span>
              <br />
              <span className="text-black font-bold text-2xl">{seconds}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <FaLeftLong className="rounded-full  bg-gray-100 text-black p-2 border border-black text-2xl hover:bg-gray-200 hover:shadow-md transition-all duration-300" />
          <FaRightLong className="rounded-full bg-gray-100 text-black p-2 border border-black text-2xl hover:bg-gray-200 hover:shadow-md transition-all duration-300" />
        </div>
      </div>
      <FlashSales />
      <Categories />
      <Products />
    </div>
  );
};

export default Main;
