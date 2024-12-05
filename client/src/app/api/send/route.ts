import type { NextApiRequest, NextApiResponse } from "next";
import { EmailTemplate } from "@/components/email-tenplate";
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.text();
  const { username, email, phone, message } = JSON.parse(body);
  console.log({ username, email, phone, message });
  try {
    const { data } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["beasthero828@gmail.com"],
      subject: "Contact Us",
      react: EmailTemplate({ username, email, phone, message }),
    });
    console.log(data, ": Data");

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error(error, "Error");
    return NextResponse.json({
      success: false,
      message: "Failed to send email.",
    });
  }
}
