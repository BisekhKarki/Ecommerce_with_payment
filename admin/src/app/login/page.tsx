"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { ApiResponse } from "@/types/ApiResponse";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const formSchema = z.object({
  email: z.string(),
  password: z.string().min(6, "Password should be of 6 characters"),
});

// interface

const page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      if (response?.error) {
        toast({
          title: "Login Failed",
          description: response.error || "Incorrect username or password",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Logged In",
          description: "User logged in successfully",
          variant: "default",
        });
        router.push("/"); // Ensure you're redirecting after successful login
      }
    } catch (error) {
      console.log("Error in login of user");
      toast({
        title: "Login failed",
        description: "Error",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center flex-col justify-center p-20">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-96 border px-12 py-8  items-center justify-center"
        >
          <h1 className="text-2xl font-bold">Login User</h1>
          <FormField
            control={form.control}
            name="email"
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
            control={form.control}
            name="password"
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
          <Button type="submit">Login</Button>
          <div>
            <p className="text-center">
              Don't have an account?{" "}
              <Link href={"/Signup"} className="underline text-blue-300 py-2 ">
                Login
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default page;
