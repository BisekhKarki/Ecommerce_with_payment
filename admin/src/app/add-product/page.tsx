"use client";
import { Dropdown } from "@/components/DropDown";
import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CldImage, CldUploadWidget } from "next-cloudinary";

const formSchema = z.object({
  productName: z.string(),
  price: z.string(),
  productImage: z.string(),
  productCode: z.string(),
  discount: z.string(),
  status: z.boolean(),
  category: z.string(),
});

const AddProduct = () => {
  const [image, selectedtImage] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  const [select, selectCategories] = useState("");
  const [publicId, setPublicId] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      price: "",
      productImage: "",
      productCode: "",
      discount: "",
      status: false,
      category: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!image) {
        toast({
          title: "Image",
          description: "Upload Image",
          variant: "destructive",
        });
        return;
      }

      if (!select) {
        toast({
          title: "Category",
          description: "Select a category",
          variant: "destructive",
        });
        return;
      }

      const formData = {
        productName: values.productName,
        productPrice: values.price,
        productImage: image,
        productCode: values.productCode,
        Discount: values.discount || "",
        status: values.status,
        category: select,
      };
      const data = await axios.post(
        "http://localhost:4000/api/products/add",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data.status == 200) {
        toast({
          title: "Product",
          description: data.data?.message,
          variant: "default",
        });
        router.push("/products");
      } else {
        toast({
          title: "Product",
          description: data.data?.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Product",
        description: "Error",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-10 w-1/2">
      <h1 className="text-4xl font-bold">Add Product</h1>
      <Separator className="w-full mb-5" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="abc" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row justify-between items-center">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Price</FormLabel>
                  <FormControl>
                    <Input placeholder="$0" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Dropdown select={select} selectCategories={selectCategories} />
          </div>
          <div className="flex  items-center justify-between">
            {publicId && (
              <CldImage
                src={publicId}
                alt={publicId}
                width={"300"}
                height={"180"}
              />
            )}
            <CldUploadWidget
              uploadPreset="product_images"
              onSuccess={({ event, info }) => {
                if (
                  event === "success" &&
                  typeof info !== "string" &&
                  info?.url
                ) {
                  setPublicId(info.public_id);
                  selectedtImage(info.url);
                }
              }}
            >
              {({ open }) => (
                <Button className="" type="button" onClick={() => open()}>
                  Upload Image
                </Button>
              )}
            </CldUploadWidget>
          </div>
          <FormField
            control={form.control}
            name="productCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Code</FormLabel>
                <FormControl>
                  <Input placeholder="x12-34c123-0-01" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Discount</FormLabel>
                <FormControl>
                  <Input placeholder="20%" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Add Product</Button>
        </form>
      </Form>
    </div>
  );
};

export default AddProduct;
