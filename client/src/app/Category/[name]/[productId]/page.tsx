"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import logo from "../../../../../public/Exclusive.png";
import KhaltiPayment from "../../components/KhaltiPayment";
import StripePayement from "../../components/StripePayement";

const page = () => {
  const params = useParams();
  const id = params.productId as string;
  const [data, setData] = useState<[] | any>([]);
  const { toast } = useToast();
  console.log(id);

  if (!id) {
    toast({
      title: "Product",
      description: "Id with the product not available",
      variant: "destructive",
    });
    return;
  }

  const getElementById = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/products/item/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const val = await response.json();
      if (response.ok) {
        setData(val.data);
      } else {
        toast({
          title: "Product",
          description: "Unable to fetch prouct",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Product",
        description: error,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    getElementById();
  }, []);

  let price = parseInt(data.productPrice, 10);
  let discount = parseInt(data.Discount, 10);

  let total = price - price * (discount / 100);
  total = Math.max(10, Math.min(total, 1000));
  let constrainedTotal = total * 100;

  return (
    <div className="p-20 flex gap-10 items-center  justify-center">
      {data && (
        <>
          <Image
            src={data ? data.productImage : logo}
            alt="image"
            width={500}
            height={500}
          />
          <div>
            <h1 className="font-bold text-2xl">
              Product Name: {data.productName}
            </h1>
            <p className="font-bold text-xl">Price: ${data.productPrice}</p>
            <p className="font-bold text-xl">Discount: {data.Discount}% off</p>
            <p className="font-bold text-xl">Code: {data.productCode}</p>
            <div className="mt-5 w-full flex  items-center gap-3 flex-wrap">
              <KhaltiPayment
                name={data.productName}
                amount={constrainedTotal}
                id={id}
              />
              <StripePayement
                name={data.productName}
                amount={constrainedTotal}
                id={id}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default page;
