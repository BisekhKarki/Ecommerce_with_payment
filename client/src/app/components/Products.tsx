"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoCart } from "react-icons/io5";

const Products = () => {
  const [data, setData] = useState<[] | any>([]);
  const { toast } = useToast();
  const router = useRouter();

  const getAllProducts = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/products/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const product = await response.json();
      if (response.ok) {
        setData(product.data);
      } else {
        toast({
          title: "Products",
          description: "Unable to fetch products",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Products",
        description: error,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const addToCart = async (
    productName: string,
    productPrice: string,
    productImage: string,
    productCode: string,
    Discount: string,
    status: boolean,
    category: string
  ) => {
    try {
      const response = await axios.post("http://localhost:4000/api/cart/add", {
        productName,
        productPrice,
        productImage,
        productCode,
        Discount,
        status,
        category,
      });
      if (response.status === 200) {
        toast({
          title: "Cart",
          description: "Item Added to cart successful",
          variant: "default",
        });
      } else {
        toast({
          title: "Cart",
          description: "Item Added to cart successful",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Cart",
        description: error,
        variant: "destructive",
      });
    }
  };

  const addToFavourite = async (
    productName: string,
    productPrice: string,
    productImage: string,
    productCode: string,
    Discount: string,
    status: boolean,
    category: string
  ) => {
    try {
      const response = await fetch("http://localhost:4000/api/favourite/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName,
          productPrice,
          productImage,
          productCode,
          Discount,
          status,
          category,
        }),
      });
      if (response.status === 200) {
        toast({
          title: "Cart",
          description: "Item Added to favourite successful",
          variant: "default",
        });
      } else {
        toast({
          title: "Cart",
          description: "Error",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Cart",
        description: error,
        variant: "destructive",
      });
    }
  };
  return (
    <div className="overflow-hidden">
      <div className="flex items-center gap-3 p-12">
        <div className="w-4 bg-red-500 h-12 rounded-sm" />
        <div>
          <p className="text-red-700 font-semibold">All Products</p>
        </div>
      </div>
      <div className=" p-12 flex flex-row flex-wrap gap-10">
        {data.map((item: any, index: any) => (
          <div
            className=" flex-col items-center h-[500px] w-[400px] shadow-xl border-gray-600 p-12 flex justify-center
              gap-2 text-sm"
            key={index}
          >
            <div
              className="
            "
              onClick={() =>
                router.push(
                  `http://localhost:3000/Category/${item.productName}/${item._id}`
                )
              }
            >
              <Image
                className="items-center"
                src={item.productImage}
                alt=""
                width={150}
                height={150}
              />
              <div className="mt-2 text-xl">
                <p>Name: {item.productName}</p>
                <p>Type: {item.category}</p>
              </div>
            </div>
            <div className=" mt-3">
              <Button
                className="flex items-center justify-center gap-5 text-xl text-center cursor-pointer"
                onClick={() =>
                  addToCart(
                    item.productName,
                    item.productPrice,
                    item.productImage,
                    item.productCode,
                    item.Discount,
                    item.status,
                    item.category
                  )
                }
              >
                <IoCart /> Add to Cart
              </Button>
              <Button
                onClick={() =>
                  addToFavourite(
                    item.productName,
                    item.productPrice,
                    item.productImage,
                    item.productCode,
                    item.Discount,
                    item.status,
                    item.category
                  )
                }
                className="flex items-center justify-center gap-5 text-sm mt-2 text-center cursor-pointer"
              >
                <Heart /> Add to Favourite
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
