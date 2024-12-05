"use client";

import { Separator } from "@/components/ui/separator";
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
import { Edit, Trash2 } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShowDeleteAlert } from "@/components/ShowDeleteAlert";

const page = () => {
  const [data, setData] = useState<[] | null>([]);
  const { toast } = useToast();
  const router = useRouter();

  const getProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/products/list"
      );
      if (data) {
        setData(response.data.data);
      } else {
        toast({
          title: "Product",
          description: "Error loading data",
          variant: "default",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  console.log(data);

  return (
    <div className="p-10 w-full">
      <h1 className="text-4xl font-bold">Product Details</h1>
      <Separator className="w-full mb-5" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Product Image</TableHead>
            <TableHead className="w-[200px]">Product Name</TableHead>
            <TableHead>Product Code</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data?.length > 0 ? (
            data?.map((item: any) => (
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
                <TableCell>{item?.productCode}</TableCell>
                <TableCell>{item?.productPrice}</TableCell>
                <TableCell>{item?.Discount}</TableCell>
                <TableCell>{item?.category}</TableCell>
                <TableCell className="text-right flex  gap-3 items-center justify-center">
                  <Edit
                    className="cursor-pointer"
                    onClick={() =>
                      router.replace(
                        `http://localhost:3000/products/${item._id}`
                      )
                    }
                  />
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
      <Pagination className="mt-20">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default page;
