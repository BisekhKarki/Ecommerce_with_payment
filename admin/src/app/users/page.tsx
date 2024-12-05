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
import { DeleteUser } from "@/components/DeleteUser";

const page = () => {
  const [data, setData] = useState<[] | null>([]);

  const getUserData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/details/get");
      if (response) {
        setData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="p-10 w-full">
      <h1 className="text-4xl font-bold">User Details</h1>
      <Separator className="w-full mb-5" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data?.length > 0 ? (
            data?.map((user: any) => (
              <TableRow key={user._id}>
                <TableCell>{user?.username}</TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell className="text-right flex  gap-3 items-center justify-center">
                  <DeleteUser id={user._id} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="text-center text-xl font-bold">
                No users available
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
