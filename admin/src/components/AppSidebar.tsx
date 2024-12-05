"use client";
import React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  ShoppingBag,
  User,
} from "lucide-react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

// Menu items.
const items = [
  {
    title: "Add Products",
    url: "/add-product",
    icon: ShoppingBag,
  },

  {
    title: "Users",
    url: "/users",
    icon: User,
  },
  {
    title: "Products",
    url: "/products",
    icon: ShoppingBag,
  },
];

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>Ecommerce Admin Pannel</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <Button onClick={() => signOut()} className="mt-10">
                Logout
              </Button>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
