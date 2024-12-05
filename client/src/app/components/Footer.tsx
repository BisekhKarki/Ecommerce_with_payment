import React from "react";
import { Input } from "@/components/ui/input";
import logo from "../../../public/Exclusive.png";
import Link from "next/link";
import Image from "next/image";
import { SendHorizonalIcon } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa6";
import scanner from "@/assets/Scanner.png";

const Footer = () => {
  return (
    <div className="text-white bg-black flex  justify-between px-8 py-10 mt-5">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl">Exclusive</h1>
        <p>Suscribe</p>
        <span className="text-sm text-gray-400">
          Get 10% off your first order
        </span>
        <div className="relative">
          <Input
            placeholder="Enter your email"
            className="bg-black text-white"
          />
          <SendHorizonalIcon className="absolute top-2 right-2 cursor-pointer" />
        </div>
      </div>
      <div className="flex flex-col gap-3 ">
        <h1 className="text-xl">Support</h1>
        <p className="text-gray-400 text-sm">
          111 Bijoy sarani, Dhaka, <br /> DH 1515, Bangladesh.
        </p>
        <p className="text-gray-400 text-sm">exclusive@gmail.com</p>
        <p className="text-gray-400 text-sm">+88015-88888-9999</p>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl">Account</h2>
        <div className="flex flex-col gap-2 text-gray-400 text-sm">
          <Link className="hover:text-white" href={"/profile"}>
            My Account
          </Link>
          <Link className="hover:text-white" href={"/login"}>
            Login/Register
          </Link>
          <Link className="hover:text-white" href={"/cart"}>
            Cart
          </Link>
          <Link className="hover:text-white" href={"/wishlist"}>
            Wishlist
          </Link>
          <Link className="hover:text-white" href={"/shop"}>
            Shop
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl">Quick Link</h2>
        <div className=" text-gray-400">
          <p className="hover:text-white cursor-pointer">Privacy Policy</p>
          <p className="hover:text-white cursor-pointer ">Terms Of Use</p>
          <p className="hover:text-white cursor-pointer ">FAQ</p>
          <p className="hover:text-white cursor-pointer ">Contact</p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h2>Download App</h2>
        <span className="text-sm text-gray-400">
          Save $3 with App New User only
        </span>
        <Image src={scanner} alt="" />
        <div className="flex justify-between py-1">
          <FaFacebook className="cursor-pointer" />
          <FaTwitter className="cursor-pointer" />
          <FaInstagram className="cursor-pointer" />
          <FaLinkedin className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
