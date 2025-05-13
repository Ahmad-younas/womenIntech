import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email, first_name } = await req.json();

  // Create a transporter object using your SMTP credentials
  const transporter = nodemailer.createTransport({
    service: "Gmail", // or your email provider
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Admin" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Your Profile Has Been Approved",
    html: `
      <p>Hi ${first_name},</p>
      <p>Your profile has been <strong>approved</strong> by the admin. Welcome aboard!</p>
      <p>Best regards,<br/>The Admin Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json({ success: false, error });
  }
}
