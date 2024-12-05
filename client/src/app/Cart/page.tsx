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
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import KhaltiPayment from "../Category/components/KhaltiPayment";
import StripePayement from "../Category/components/StripePayement";

const page = () => {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  const getCartQuantity = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/cart/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setCart(data.data);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartQuantity();
  }, []);

  const increaseQuantity = (quantity: number, productId: string) => {
    try {
      const newQuantity = quantity + 1;
      updateCart(productId, newQuantity, "increase");
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQuantity = (quantity: number, productId: string) => {
    try {
      const newQuantity = quantity - 1;
      updateCart(productId, newQuantity, "decrease");
    } catch (error) {
      console.log(error);
    }
  };

  const updateCart = async (
    productId: string,
    newQuantity: number,
    type: string
  ) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/cart/${type}/${productId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: productId,
            quantity: newQuantity,
          }),
        }
      );

      const getResponse = await response.json();
      if (response.ok) {
        getCartQuantity();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [total, setTotal] = useState(0); // State for total amount

  useEffect(() => {
    const calculateTotal = () => {
      const totalAmount = cart.reduce((sum: any, item: any) => {
        return (
          sum +
          item.quantity *
            (item.productPrice - (item.Discount / 100) * item.productPrice)
        );
      }, 0);
      setTotal(totalAmount);
    };
    calculateTotal();
  }, [cart]);

  return (
    <div className="flex px-14 py-10 gap-10 justify-center ">
      <div className=" mt-10 w-4/5 border border-gray-200  shadow-2xl">
        <Table className="p-5">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Product Image</TableHead>
              <TableHead className="w-[200px]">Product Name</TableHead>

              <TableHead>Price</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart && cart?.length > 0 ? (
              cart?.map((item: any) => (
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
                  <TableCell className="flex gap-2 cursor-pointer items-center">
                    <Minus
                      onClick={() => decreaseQuantity(item.quantity, item._id)}
                    />
                    <span className="border border-black px-3 py-2">
                      {item?.quantity}
                    </span>
                    <Plus
                      onClick={() => increaseQuantity(item.quantity, item._id)}
                    />
                  </TableCell>
                  <TableCell>{item?.category}</TableCell>
                  <TableCell className="text-right flex  gap-3 items-center justify-center">
                    <ShowDeleteAlert id={item._id} />
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
      <div className=" mt-10 px-5 py-5 border border-gray-200  shadow-2xl">
        <div>
          <h1 className="font-bold text-2xl mb-2">Cart Total</h1>
          <hr />
          <Table className="p-5">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Product Name</TableHead>

                <TableHead>Price</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Sub Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart && cart?.length > 0 ? (
                cart?.map((item: any) => (
                  <TableRow key={item._id}>
                    <TableCell>{item?.productName}</TableCell>

                    <TableCell>${item?.productPrice}</TableCell>
                    <TableCell>{item?.Discount}%</TableCell>

                    <TableHead>{item.quantity}</TableHead>
                    <TableHead>
                      {item.quantity *
                        (item?.productPrice -
                          (item?.Discount / 100) * item?.productPrice)}
                    </TableHead>
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
        <hr />
        <div className=" mt-2 mb-5 flex flex-row justify-between">
          <p className="font-bold text-xl">Total</p>
          <p className="font-bold text-xl">${total}</p>
        </div>

        <AlertDialog>
          <AlertDialogTrigger className="bg-red-400 px-5 py-3 text-white rounded-sm">
            Proceed To Checkout
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Payment Options</AlertDialogTitle>
              <AlertDialogDescription>
                Choose between Two inorder to make payment
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <KhaltiPayment id={"123"} amount={total} name={"Cart payment"} />
              <StripePayement id={"123"} amount={100} name={"Cart payment"} />
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default page;
