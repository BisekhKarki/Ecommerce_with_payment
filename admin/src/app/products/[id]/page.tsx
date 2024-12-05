"use client";
import { Dropdown } from "@/components/DropDown";
import { Button } from "@/components/ui/button";
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
import { CldImage, CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  productName: z.string(),
  price: z.string(),
  productImage: z.string(),
  productCode: z.string(),
  discount: z.string(),
  status: z.boolean(),
  category: z.string(),
});
interface Props {
  params: Promise<{ id: string }>;
}

const page = ({ params }: Props) => {
  const { id } = React.use(params); // Unwrap `params` using `React.use()`
  console.log(id);
  const [image, selectedtImage] = useState("");
  const { toast } = useToast();
  const [data, setData] = useState<[] | any>([]);
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

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/products/item/${id}`
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
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
        `http://localhost:4000/api/products/edit/${id}`,
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
      console.log(error);
    }
  };

  return (
    <div className="p-10 w-1/2">
      <Button onClick={() => router.replace("/products")}>
        Back to Products
      </Button>
      <h1 className="text-4xl font-bold mt-5">Edit Product</h1>
      <Separator className="w-full mb-5" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder={data?.productName}
                    {...field}
                    type="text"
                  />
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
                    <Input
                      placeholder={data?.productPrice}
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Dropdown select={select} selectCategories={selectCategories} />
          </div>
          <div className="flex  items-center justify-between">
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
                <Button type="button" onClick={() => open()}>
                  Upload Image
                </Button>
              )}
            </CldUploadWidget>
            {publicId && (
              <CldImage
                src={publicId === "" ? data.productImage : publicId}
                alt={publicId}
                width={"300"}
                height={"180"}
              />
            )}
          </div>
          <FormField
            control={form.control}
            name="productCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder={data?.productCode}
                    {...field}
                    type="text"
                  />
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
                  <Input placeholder={data?.Discount} {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button>Edit Product</Button>
        </form>
      </Form>
    </div>
  );
};

export default page;
