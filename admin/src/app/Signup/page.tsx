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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { ApiResponse } from "@/types/ApiResponse";
import Link from "next/link";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string(),
  password: z.string().min(6, "Password should be of 6 characters"),
  role: z.string(),
});

// interface

const page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "",
    },
  });

  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post<ApiResponse>("/api/register", {
        username: values.username,
        email: values.email,
        password: values.password,
        role: "Admin",
      });

      if (response) {
        toast({
          title: "Success",
          description: "User registered successfully",
          variant: "default",
        });
      }
    } catch (error) {
      console.log("Error in signup of user");
      toast({
        title: "Signup failed",
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
          <h1 className="text-2xl font-bold">Register User</h1>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <Button type="submit">Register</Button>
          <div>
            <p className="text-center">
              Already have an account?{" "}
              <Link href={"/login"} className="underline text-blue-300 py-2 ">
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
