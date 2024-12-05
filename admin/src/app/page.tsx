"use client";
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AddProduct from "./add-product/page";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.replace("/login");
  }

  return (
    <div className="p-5 text-center">
      <h1>Welcome to the Admin Page</h1>
      <Separator />
    </div>
  );
}
