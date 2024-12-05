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

export function DeleteUser({ id }: Props) {
  const { toast } = useToast();
  const router = useRouter();

  const deleteItem = async (id: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/details/delete/${id}`
      );
      if (response.status == 200) {
        toast({
          title: "User",
          description: "User Deleted Successfully",
          variant: "default",
        });
        router.push("/users");
      } else {
        toast({
          title: "User",
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
    } finally {
      router.push("/users");
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
            This action cannot be undone. This will permanently delete user and
            remove it from our database.
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
