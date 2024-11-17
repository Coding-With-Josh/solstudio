"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Icons from "~/components/shared/icons";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { toast } from "~/components/ui/use-toast";
import { FreePlanLimitError } from "~/lib/utils";
import { checkIfFreePlanLimitReached, createdapp } from "./action";

export const dappSchema = z.object({
  name: z.string().min(1, { message: "Please enter a dapp name." }),
  description: z.string().min(1, { message: "Please enter a description for your dapp." }),
});

export type DappFormValues = z.infer<typeof dappSchema>;

interface CreateDappModalProps {
  projectId: string;
}

export default function CreateDappModal({ projectId }: CreateDappModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<DappFormValues>({
    resolver: zodResolver(dappSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: DappFormValues) {
    try {
      const limitReached = await checkIfFreePlanLimitReached(projectId);
      if (limitReached) {
        throw new FreePlanLimitError();
      }

      await createdapp({
        name: values.name,
        description: values.description,
        projectId: projectId,
      });

      toast({
        title: "DApp created successfully.",
      });
      form.reset();
      setIsOpen(false);
    } catch (error) {
      console.error({ error });
      if (error instanceof FreePlanLimitError) {
        return toast({
          title: "Free plan limit reached. Please upgrade your plan.",
          variant: "destructive",
        });
      }
      return toast({
        title: "Error creating dapp. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card
          role="button"
          className="flex flex-col items-center justify-center gap-y-2.5 p-8 text-center hover:bg-accent"
        >
          <Button size="icon" variant="ghost">
            <Icons.projectPlus className="h-8 w-8" />
          </Button>
          <p className="text-xl font-medium">Create a DApp</p>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create DApp</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My DApp" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter a description for your DApp"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Create DApp</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
