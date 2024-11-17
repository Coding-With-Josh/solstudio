"use server";

import { dApp, smartContract, type Project } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { validateRequest } from "~/actions/auth";
import { getUserSubscriptionPlan } from "~/actions/subscription";
import prisma from "~/lib/prisma";

interface Payload {
  name: string;
  description: string;
  projectId: string;
}

export async function createdapp(payload: Payload) {
  try {
    const { user } = await validateRequest();
    
    // Verify project exists and belongs to user
    const project = await prisma.project.findUnique({
      where: {
        id: payload.projectId,
        userId: user?.id
      }
    });

    if (!project) {
      throw new Error("Project not found or access denied");
    }

    const dapp = await prisma.dApp.create({
      data: {
        name: payload.name,
        description: payload.description,
        project: {
          connect: {
            id: payload.projectId,
          },
        },
      },
    });

    revalidatePath(`/dashboard/projects/${payload.projectId}`);
    return dapp;
  } catch (error) {
    console.error("Error creating dApp:", error);
    throw error;
  }
}

export async function checkIfFreePlanLimitReached(projectId: string) {
  const { user } = await validateRequest();
  const subscriptionPlan = await getUserSubscriptionPlan(user?.id as string);

  if (subscriptionPlan?.isPro) return false;

  const count = await prisma.dApp.count({
    where: {
      project: {
        id: projectId,
        userId: user?.id,
      },
    },
  });

  return count >= 3;
}

export async function getdapps(projectId: string) {
  try {
    const { user } = await validateRequest();
    const dapps = await prisma.dApp.findMany({
      where: {
        project: {
          id: projectId,
          userId: user?.id,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        components: true
      }
    });
    return dapps;
  } catch (error) {
    console.error("Error fetching dApps:", error);
    throw error;
  }
}

export async function getdappById(id: string, projectId: string) {
  try {
    const { user } = await validateRequest();
    const dapp = await prisma.dApp.findFirst({
      where: {
        id,
        project: {
          id: projectId,
          userId: user?.id,
        },
      },
      include: {
        components: true
      }
    });
    
    if (!dapp) {
      throw new Error("dApp not found or access denied");
    }
    
    return dapp;
  } catch (error) {
    console.error("Error fetching dApp:", error);
    throw error;
  }
}

export async function updatedappById(id: string, payload: Payload) {
  try {
    const { user } = await validateRequest();
    const updatedDapp = await prisma.dApp.update({
      where: {
        id,
        project: {
          id: payload.projectId,
          userId: user?.id,
        },
      },
      data: {
        name: payload.name,
        description: payload.description,
      },
    });
    
    revalidatePath(`/dashboard/projects/${payload.projectId}`);
    return updatedDapp;
  } catch (error) {
    console.error("Error updating dApp:", error);
    throw error;
  }
}

export async function deletedappById(id: string, projectId: string) {
  try {
    const { user } = await validateRequest();
    await prisma.dApp.delete({
      where: {
        id,
        project: {
          id: projectId,
          userId: user?.id,
        },
      },
    });
    
    revalidatePath(`/dashboard/projects/${projectId}`);
  } catch (error) {
    console.error("Error deleting dApp:", error);
    throw error;
  }
}
