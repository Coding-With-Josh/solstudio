import { generateEmailVerificationCode } from "~/actions/auth";
import { sendOTP } from "~/actions/mail";
import prisma from "~/lib/prisma";

export const POST = async (req: Request) => {
  const body = await req.json();

  try {
    const user = await prisma.user.upsert({
      where: {
        email: body.email,
      },
      update: {},
      create: {
        email: body.email,
        emailVerified: false,
      },
    });
    console.log("Success");

    const otp = await generateEmailVerificationCode(user.id, body.email);

    try {
      await sendOTP({
        toMail: body.email,
        code: otp,
        userName: user.name?.split(" ")[0] || "",
      });
      console.log("Success sending");
    } catch (error) {
      console.log("aileddddd");
    }

    return new Response(null, {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return new Response(null, {
      status: 500,
    });
  }
};
