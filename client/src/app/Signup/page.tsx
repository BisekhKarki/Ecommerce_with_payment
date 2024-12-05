"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import sideImage from "../../assets/Side Image.png";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaGoogle } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

import axios, { AxiosError } from "axios";
import { ApiResponse } from "../../types/ApiResponse";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  username: z.string().min(3, "Username must be atleast 3 characters"),
  email: z.string(),
  password: z.string().min(6, "Password must be 6 characters atleast"),
});

const SignupPage = () => {
  const location = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const response = await axios.post<ApiResponse>("/api/register", values);
      toast({
        title: "Success",
        description: "User registered successfully",
        variant: "default",
      });
      if (response.status === 200) {
        router.replace("/login");
      }
    } catch (error) {
      console.log("Error in signup of user");
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: "Signup failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="py-8 flex items-center gap-32">
      <Image src={sideImage} alt="" className="h-[600px] w-[750px]" />
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormDescription className="text-4xl font-semibold text-black">
              Create an Account
              <br />
              <span className="text-sm text-gray-500 font-normal">
                Enter your detail below
              </span>
            </FormDescription>

            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usernmae</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username"
                      {...field}
                      type="text"
                      className=""
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Create an Account
            </Button>
          </form>
        </Form>
        <Button
          className="mt-2 mb-2 w-full bg-white text-black border  hover:bg-gray-100"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          Continue with google <FcGoogle />
        </Button>
        <p className="text-center">
          Already have an account?{" "}
          <Link href={"/login"} className="underline text-blue-300 py-2 ">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
