"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import about from "@/assets/About.png";

import {
  AirplayIcon,
  BadgeDollarSign,
  Headphones,
  ShoppingBag,
} from "lucide-react";
import { FcShop } from "react-icons/fc";
import tom from "@/assets/about/Tom.png";
import ema from "@/assets/about/Ema.png";
import will from "@/assets/about/Will.png";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa6";
import fullservice from "@/assets/Full services.png";

const members = [
  {
    name: "Tom Cruise",
    position: "Founder & Chairman",
    src: tom,
  },
  {
    name: "Emma Watson",
    position: "Managing Director",
    src: ema,
  },
  {
    name: "Will Smith",
    position: "Product Designer",
    src: will,
  },
];

const page = () => {
  return (
    <div className="p-10">
      <div>
        <p className="text-gray-400">
          <Link href={"/"}>Home</Link> /{" "}
          <span className="text-gray-600">About</span>
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col w-1/2 gap-10 text-gray-500">
          <h1 className="text-5xl font-extrabold text-black">Our Story</h1>
          <p className="w-4/5">
            Launced in 2015, Exclusive is South Asia’s premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region.{" "}
          </p>
          <p className="w-4/5">
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assotment in categories
            ranging from consumer.
          </p>
        </div>
        <div>
          <Image src={about} alt="about" className="" />
        </div>
      </div>

      <div className="flex text-center items-center mt-24 justify-between p-8">
        <div
          className="flex flex-col items-center justify-center gap-1 bg-white border rounded-xl shadow-md
         hover:bg-red-500 hover:text-white cursor-pointer transition-all
          border-gray-300 py-7 px-9"
        >
          <FcShop className="text-3xl" />
          <p>10.5k</p>
          <p>Sallers active our site</p>
        </div>
        <div
          className="flex flex-col items-center justify-center gap-1 
        bg-white border rounded-xl 
         hover:bg-red-500 hover:text-white cursor-pointer transition-all
        shadow border-gray-300 py-7  px-12 "
        >
          <BadgeDollarSign className="text-3xl" />
          <p>33k</p>
          <p>Monthly Product Sale</p>
        </div>
        <div
          className="flex flex-col items-center justify-center gap-1
         bg-white border rounded-xl shadow
          hover:bg-red-500 hover:text-white cursor-pointer transition-all
         border-gray-300 py-7  px-7 "
        >
          <Headphones className="text-3xl" />
          <p>45.5k</p>
          <p>Customer active in our site</p>
        </div>
        <div
          className="flex flex-col items-center justify-center gap-1
         bg-white border rounded-xl shadow
          hover:bg-red-500 hover:text-white cursor-pointer transition-all
         border-gray-300 py-7  px-7 "
        >
          <ShoppingBag className="text-3xl" />
          <p>25k</p>
          <p>Annual gross sale in our site</p>
        </div>
      </div>
      <div className="flex justify-between mt-12">
        {members.map((member, index) => (
          <div className="" key={index}>
            <Image
              src={member.src}
              alt={member.name}
              height={500}
              width={400}
            />
            <h1 className="text-3xl font-semibold mt-5">{member.name}</h1>
            <p className="text-gray-500 mt-2">{member.position}</p>
            <div className="flex gap-5 mt-2 cursor-pointer">
              <FaTwitter className=" hover:text-gray-400" />
              <FaInstagram className=" hover:text-gray-400" />
              <FaLinkedin className=" hover:text-gray-400" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-36 mb-10">
        <Image src={fullservice} alt="Full Service" width={700} height={200} />
      </div>
    </div>
  );
};

export default page;
