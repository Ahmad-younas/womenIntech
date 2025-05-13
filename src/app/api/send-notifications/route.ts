import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const body = await req.json();
  const { userEmail, userName } = body;

  console.log("From routes", userEmail, userName);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // true for port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    // Send email to user
    const userMail = await transporter.sendMail({
      from: `"Your App" <${process.env.SMTP_USER}>`,
      to: userEmail,
      subject: "Thanks for registering!",
      html: `<p>Hello ${userName},<br/>Your profile has been created. You’ll be notified when it is approved.</p>`,
    });

    

    // Send email to admin
    const adminMail = await transporter.sendMail({
      from: `"Your App" <${process.env.SMTP_USER}>`,
      to: "ahmadyounas2k18@gmail.com",
      subject: "New user registration",
      html: `<p>User <strong>${userName}</strong> has just registered. Please review their profile.</p>`,
    });

    

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Email sending error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
