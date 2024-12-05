"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Mail, PhoneCall } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

// Define the form schema with validation
const formSchema = z.object({
  username: z.string().min(1),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10).max(10),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(200, "Message must not exceed 200 characters"),
});

const ContactPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  // Initialize the form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // const response = await axios.post(
      //   "http://localhost:3000/api/send",

      //   {
      //     username: values.username,
      //     email: values.email,
      //     phone: values.phone,
      //     message: values.message,
      //   }
      // );

      const response = await fetch("http://localhost:3000/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          phone: values.phone,
          message: values.message,
        }),
      });

      if (response.status === 200) {
        toast({
          title: "Contact Form",
          description: "Message sent Successfully",
        });
        form.reset();
        console.log("Form submitted successfully:", values);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div className="p-10">
      <div>
        <p className="text-gray-400">
          <Link href={"/"}>Home</Link> /{" "}
          <span className="text-gray-600">Contact</span>
        </p>
      </div>
      <div className="flex pt-10 gap-10">
        <div className="flex flex-col gap-3 py-10 w-1/4 bg-white border-gray-300 shadow-lg px-8 justify-center">
          <p className="text-xl flex items-center gap-5">
            <PhoneCall className="text-red-500" />
            Call To Us
          </p>
          <p className="text-sm">We are available 24/7, 7 days a week.</p>
          <p className="text-sm">Phone: +8801611122222</p>
          <hr className="p-3 pt-2" />
          <p className="text-xl flex items-center gap-5">
            <Mail className="text-red-500" />
            Write To Us
          </p>
          <p className="text-sm">
            Fill out the form and we will contact
            <br />
            you within 24 hours.
          </p>
          <p className="text-sm">Emails: customer@exclusive.com</p>
          <p>Emails: support@exclusive.com</p>
        </div>
        <div className="w-9/12 bg-white shadow-lg p-10 border-black">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex w-9/12 gap-12">
                <FormField
                  name="username"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <Input
                        type="text"
                        placeholder="Your name"
                        {...field}
                        className="w-72"
                      />
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
                      <Input
                        type="email"
                        placeholder="Your email"
                        {...field}
                        className="w-72"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="phone"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <Input
                        type="text"
                        placeholder="Your phone"
                        {...field}
                        className="w-72"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-5">
                <FormField
                  name="message"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <Textarea
                        {...field}
                        placeholder="Your message"
                        className="w-full"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="mt-2">
                Send Message
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
