"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { ShowDeleteAlert } from "@/components/ShowDeleteAlert";

import { useRouter } from "next/navigation";
import { DeleteFavourite } from "@/components/DeleteFavourite";

const page = () => {
  const [favourite, setFavourite] = useState([]);
  const router = useRouter();

  const getFavourite = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/favourite/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setFavourite(data.message);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFavourite();
  }, []);

  return (
    <div>
      <div className="px-20 py-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Product Image</TableHead>
              <TableHead className="w-[200px]">Product Name</TableHead>

              <TableHead>Price</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Product Code</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {favourite && favourite?.length > 0 ? (
              favourite?.map((item: any) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">
                    <Image
                      className="items-center"
                      src={item.productImage}
                      alt=""
                      width={50}
                      height={50}
                    />
                  </TableCell>
                  <TableCell>{item?.productName}</TableCell>

                  <TableCell>${item?.productPrice}</TableCell>
                  <TableCell>{item?.Discount}%</TableCell>
                  <TableCell className="">{item.productCode}</TableCell>
                  <TableCell>{item?.category}</TableCell>
                  <TableCell className="text-right flex  gap-3 items-center justify-center">
                    <DeleteFavourite id={item._id} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="text-center text-xl font-bold">
                  No roducts available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default page;
