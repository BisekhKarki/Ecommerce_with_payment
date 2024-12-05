"use client";
import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const params = useParams();
  const [products, setProducts] = useState<[] | any>([]);
  // const { data: session } = useSession();
  const names = params.name;

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/products/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const filterData = data.data.filter(
        (prod: any) => prod.category === params.name
      );

      if (response.ok) {
        setProducts(filterData);
      } else {
        toast({
          title: "Products",
          description: "No products available",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Products",
        description: "Error",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between items-center p-20 flex-wrap">
        {products.map((item: any, index: any) => (
          <div
            key={index}
            className="h-[400px] w-[300px] shadow-xl border-gray-600 p-12 flex justify-center
             items-center flex-col gap-2 text-sm
              hover:bg-red-400 hover:text-white cursor-pointer rounded-sm transition-all ease-in-out delay-75  hover:-translate-y-10  t "
            onClick={() =>
              router.push(`http://localhost:3000/Category/${names}/${item._id}`)
            }
          >
            <Image
              className="items-center  hover:scale-125 transition-all ease-out delay-75 "
              src={item.productImage}
              alt=""
              width={150}
              height={150}
            />
            <div className="mt-2">
              <p>Name: {item.productName}</p>
              <p>Price: ${item.productPrice}</p>
              <p>Discount: {item.Discount}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
