"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
}

export function DeleteFavourite({ id }: Props) {
  const { toast } = useToast();
  const router = useRouter();

  const deleteItem = async (id: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/favourite/delete/${id}`
      );
      if (response.status == 200) {
        toast({
          title: "Product",
          description: "Product Deleted Successfully",
          variant: "default",
        });
        router.refresh();
      } else {
        toast({
          title: "Product",
          description: "Error deleting product",
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash2 className="text-red-500" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            product from the Favourite.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteItem(id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
