"use client";

import Image from "next/image";
import React, { Profiler, useEffect, useState } from "react";
import logo from "../../../public/Exclusive.png";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  CarTaxiFront,
  Heart,
  PowerOffIcon,
  Search,
  ShoppingBasket,
  User,
} from "lucide-react";
import { IoCartOutline } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const path = usePathname();
  const { data: session } = useSession();
  const router = useRouter();
  const [quantity, setQuantity] = useState(0);
  const [favourite, setFavourite] = useState(0);

  const logOut = () => {
    signOut();
    router.replace("/");
  };

  const getCartQuantity = async () => {
    if (session) {
    }
    try {
      const response = await fetch("http://localhost:4000/api/cart/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      let total = 0;
      const totals = data.data.reduce(
        (sum: any, item: any) => sum + item.quantity,
        total
      );
      setQuantity(totals);
    } catch (error) {
      console.log(error);
    }
  };

  const getFavouriteQuantity = async () => {
    if (session) {
    }
    try {
      const response = await fetch("http://localhost:4000/api/favourite/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.ok) {
        setFavourite(data.message.length);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCartQuantity();
    getFavouriteQuantity();
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-between items-center px-6 py-5">
        <Image src={logo} alt="logo" className="w-24 h-5" />
        <div className="flex flex-row gap-5">
          <Link href={"/"}>Home</Link>
          <Link href={"/Contact"}>Contact</Link>
          <Link href={"/about"}>About</Link>
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <User />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 cursor-pointer bg-gray-100 p-4 border-gray-700">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <hr />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <hr />
                  <DropdownMenuItem>
                    <span onClick={logOut}>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href={"/Signup"}>Signup</Link>
          )}
        </div>
        <div className="flex  items-center px-5">
          <div className="relative">
            <Input placeholder="What are you looking for" className="w-56" />
            <Search className="w-12 h-5  absolute top-2 -right-1" />
          </div>
          <div className="relative">
            <Heart
              className="w-12 h-5 cursor-pointer"
              onClick={() => router.push("/Favourites")}
            />
            <p className="text-sm absolute -top-3 bg-black text-white shadow border-gray-900 rounded-full px-2 left-6">
              {favourite}
            </p>
          </div>
          <div className="relative">
            <IoCartOutline
              className="w-12 h-5 cursor-pointer text-xl"
              onClick={() => router.push("/Cart")}
            />
            <p className="text-sm absolute -top-3 bg-black text-white shadow border-gray-900 rounded-full px-2 left-6">
              {quantity}
            </p>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Navbar;
