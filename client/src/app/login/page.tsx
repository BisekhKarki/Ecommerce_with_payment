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
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string(),
  password: z.string().min(6, "Password must be 6 characters atleast"),
});

const LoginPage = () => {
  const location = usePathname();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });
    if (result?.error) {
      toast({
        title: "Login Failed",
        description: "Incorrect username or password",
        variant: "destructive",
      });
    }
    if (result?.url) {
      toast({
        title: "Logged In",
        description: "User logged in successfully",
        variant: "default",
      });
      router.push("/");
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
              Login
            </Button>
          </form>
        </Form>
        <Button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="mt-2 mb-3 w-full bg-white text-black border  hover:bg-gray-100"
        >
          Continue with google <FcGoogle />
        </Button>
        <p className="text-center">
          Don't have an account?{" "}
          <Link href={"/Signup"} className="underline text-blue-300 py-2 ">
            Singup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
