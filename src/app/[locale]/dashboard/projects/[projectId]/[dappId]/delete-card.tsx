"use client";

import { type dApp, type Project } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Icons from "~/components/shared/icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Card, CardDescription, CardTitle } from "~/components/ui/card";
import { toast } from "~/components/ui/use-toast";
import { deletedappById } from "../action";

interface DeleteCardProps {
  dapp: dApp;
  project: Project;
}

export default function DeleteCard({ dapp, project }: DeleteCardProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const handleDelete = async () => {
    try {
      await deletedappById(dapp.id, project.id);
      toast({
        title: "DApp deleted successfully.",
      });
      router.push(`/dashboard/projects/${project.id}`);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error deleting dapp.",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="mt-5 flex items-center justify-between p-6">
      <div>
        <CardTitle className="mb-2.5">Delete DApp</CardTitle>
        <CardDescription>
          The dApp &quot;{dapp.name}&quot; will be permanently deleted. This action is irreversible
          and cannot be undone.
        </CardDescription>
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" disabled={pending}>
            {pending ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.trash className="mr-2 h-4 w-4" />
            )}
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this DApp?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => startTransition(() => handleDelete())}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
