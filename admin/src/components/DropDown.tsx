"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Camera,
  Computer,
  Gamepad,
  Headphones,
  Phone,
  Watch,
} from "lucide-react";

interface Props {
  select: string;
  selectCategories: (categories: string) => void;
}

export function Dropdown({ select, selectCategories }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {select ? select : "Select A Category "}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={select} onValueChange={selectCategories}>
          <DropdownMenuRadioItem value="Gaming">
            <Gamepad />
            Gaming
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Phones">
            <Phone />
            Phones
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Computers">
            <Computer />
            Computers
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Watch">
            <Watch />
            Watch
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Camera">
            <Camera />
            Camera
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="HeadPhones">
            <Headphones />
            HeadPhones
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
