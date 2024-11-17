"use server";

import { dApp, smartContract, type Project } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { validateRequest } from "~/actions/auth";
import { getUserSubscriptionPlan } from "~/actions/subscription";
import prisma from "~/lib/prisma";

interface Payload {
  name: string;
  domain: string;
  dapps?: dApp;
  smartcontracts?: smartContract;
}

export async function createProject(payload: Payload) {
  const { user } = await validateRequest();

  await prisma.project.create({
    data: {
      ...payload,
      user: {
        connect: {
          id: user?.id,
        },
      },
      dapps: payload.dapps ? { create: [{ ...payload.dapps }] } : undefined, // Ensure dapps is structured correctly
      smartcontracts: payload.smartcontracts
        ? { create: [{ ...payload.smartcontracts }] }
        : undefined, // Ensure smartcontracts is structured correctly
    },
  });

  revalidatePath(`/dashboard/projects`);
}

export async function checkIfFreePlanLimitReached() {
  const { user } = await validateRequest();
  const subscriptionPlan = await getUserSubscriptionPlan(user?.id as string);

  // If user is on a free plan.
  // Check if user has reached limit of 3 projects.
  if (subscriptionPlan?.isPro) return false;

  const count = await prisma.project.count({
    where: {
      userId: user?.id,
    },
  });

  return count >= 3;
}

export async function getProjects() {
  const { user } = await validateRequest();
  const projects = await prisma.project.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return projects as Project[];
}

export async function getProjectById(id: string) {
  const { user } = await validateRequest();
  const project = await prisma.project.findFirst({
    where: {
      id,
      userId: user?.id,
    },
  });
  return project as Project;
}

export async function updateProjectById(id: string, payload: Payload) {
  const { user } = await validateRequest();
  await prisma.project.update({
    where: {
      id,
      userId: user?.id,
    },
    data: {
      ...payload,
      dapps: payload.dapps ? { update: [{ where: { id: payload.dapps.id }, data: { ...payload.dapps } }] } : undefined, // Adjusted to include 'where' and 'data'
      smartcontracts: payload.smartcontracts
        ? { update: [{ where: { id: payload.smartcontracts.id }, data: { ...payload.smartcontracts } }] } // Adjusted to include 'where' and 'data'
        : undefined, // Adjusted to use 'update'
    },
  });
  revalidatePath(`/dashboard/projects`);
}

export async function deleteProjectById(id: string) {
  const { user } = await validateRequest();
  await prisma.project.delete({
    where: {
      id,
      userId: user?.id,
    },
  });
  revalidatePath(`/dashboard/projects`);
  redirect("/dashboard/projects");
}
