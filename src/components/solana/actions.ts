"use server";

import { validateRequest } from "~/actions/auth";
import prisma from '~/lib/prisma';

export const walletModel = async(userWalletAddress: string) => {

    const { user } = await validateRequest();

    const updateUserWallet = async () => {
       await prisma.user.update({
            where: {
                id: user?.id,
            },
            data: {
                walletAddress: userWalletAddress,
            },
        });
        return user;
    }
}