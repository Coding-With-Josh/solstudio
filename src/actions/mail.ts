"use server";

import ThanksTemp from "emails/thanks";
import VerificationTemp from "emails/verification";
import { nanoid } from "nanoid";
import { resend } from "~/lib/resend";
import { type SendOTPProps, type SendWelcomeEmailProps } from "~/types";

export const sendWelcomeEmail = async ({
  toMail,
  userName,
}: SendWelcomeEmailProps) => {
  const subject = "Thanks for using SolStudio!";
  const temp = ThanksTemp({ userName });

  await resend.emails.send({
    from: `SolStudio <codewithjoshh@gmail.com>`,
    to: toMail,
    subject: subject,
    headers: {
      "X-Entity-Ref-ID": nanoid(),
    },
    react: temp,
    text: "",
  });
};

export const sendOTP = async ({ toMail, code, userName }: SendOTPProps) => {
  const subject = "OTP for SolStudio";
  const temp = VerificationTemp({ userName, code });

  await resend.emails.send({
    from: `SolStudio <codewithjoshh@gmail.com>`,
    to: toMail,
    subject: subject,
    headers: {
      "X-Entity-Ref-ID": nanoid(),
    },
    react: temp,
    text: "",
  });
};
