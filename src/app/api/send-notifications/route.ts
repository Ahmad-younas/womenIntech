import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { supabase } from "@/lib/supabase";

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
    await transporter.sendMail({
      from: `"WomenInTech" <${process.env.SMTP_USER}>`,
      replyTo: "noreply@womenintech.com",
      to: userEmail,
      subject: "Thanks for registering!",
      html: `
        <p>Hello ${userName},</p>
        <p>Your profile has been created. You'll be notified when it is approved.</p>
        <p><strong>Note:</strong> This is an automated message. Please do not reply to this email.</p>
        <p>Best regards,<br/>The WomenInTech Team</p>
      `,
    });

    // Get admin users from database
    const { data: adminRoles, error: adminError } = await supabase
      .from("user_roles")
      .select("user_id")
      .eq("role", "admin");

    if (adminError) {
      console.error("Error fetching admin roles:", adminError);
    } else if (adminRoles && adminRoles.length > 0) {
      // Get admin user profiles to get their emails
      const adminUserIds = adminRoles.map(role => role.user_id);
      
      const { data: adminProfiles, error: profileError } = await supabase
        .from("user_profile")
        .select("email, first_name")
        .in("id", adminUserIds);

      if (profileError) {
        console.error("Error fetching admin profiles:", profileError);
      } else if (adminProfiles && adminProfiles.length > 0) {
        // Send email to each admin
        for (const admin of adminProfiles) {
          await transporter.sendMail({
            from: `"WomenInTech" <${process.env.SMTP_USER}>`,
            replyTo: "noreply@womenintech.com",
            to: admin.email,
            subject: "New user registration",
            html: `
              <p>Hello ${admin.first_name || 'Admin'},</p>
              <p>User <strong>${userName}</strong> has just registered. Please review their profile.</p>
              <p><strong>Note:</strong> This is an automated notification. Please do not reply to this email.</p>
              <p>Best regards,<br/>The WomenInTech System</p>
            `,
          });
        }
        console.log(`Admin notification emails sent to ${adminProfiles.length} admin(s)`);
      } else {
        console.log("No admin profiles found with email addresses");
      }
    } else {
      console.log("No admin users found in the system");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json({ error: error}, { status: 500 });
  }
}
