"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type dApp, type Project } from "@prisma/client";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Icons from "~/components/shared/icons";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
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
import { updatedappById } from "../action";

const dappEditSchema = z.object({
  name: z.string().min(1, { message: "Please enter a dapp name." }),
  description: z.string().min(1, { message: "Please enter a description for your dapp." }),
});

type DappEditValues = z.infer<typeof dappEditSchema>;

interface EditableDetailsProps {
  dapp: dApp;
  project: Project;
}

export default function EditableDetails({ dapp, project }: EditableDetailsProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<DappEditValues>({
    resolver: zodResolver(dappEditSchema),
    defaultValues: {
      name: dapp.name,
      description: dapp.description,
    },
  });

  async function onSubmit(values: DappEditValues) {
    startTransition(async () => {
      try {
        await updatedappById(dapp.id, {
          name: values.name,
          description: values.description,
          projectId: project.id,
        });

        toast({
          title: "DApp updated successfully.",
        });
      } catch (error) {
        console.error(error);
        toast({
          title: "Error updating dapp.",
          description: "Please try again.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit DApp</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.save className="mr-2 h-4 w-4" />
              )}
              Save Changes
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
