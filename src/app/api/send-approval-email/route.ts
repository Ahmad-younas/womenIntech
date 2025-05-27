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
    from: `"WomenInTech" <${process.env.SMTP_USER}>`,
    replyTo: "noreply@womenintech.com",
    to: email,
    subject: "Your Profile Has Been Approved - Create Your WITDAY Ambassador Image!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
        <div style="background: linear-gradient(135deg, #7c3aed, #a855f7); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Welcome to WomenInTech Network!</h1>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <p style="font-size: 18px; color: #374151; margin-bottom: 20px;">Hi ${first_name},</p>
          
          <p style="font-size: 16px; color: #374151; line-height: 1.6; margin-bottom: 20px;">
            Congratulations! Your profile has been <strong style="color: #7c3aed;">approved</strong> by our admin team. 
            Welcome to the WomenInTech Network community! 🚀
          </p>
          
          <div style="background: linear-gradient(135deg, #06b6d4, #0891b2); padding: 25px; border-radius: 8px; margin: 25px 0; text-align: center;">
            <h2 style="color: white; margin: 0 0 15px 0; font-size: 22px;">🌟 Special Opportunity!</h2>
            <p style="color: white; margin: 0 0 20px 0; font-size: 16px; line-height: 1.5;">
              Create your personalized Women in Tech Day (WITDAY) Ambassador image and join our mission to amplify 15 million women in tech!
            </p>
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/witday-ambassador" 
               style="display: inline-block; background: white; color: #0891b2; padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: bold; font-size: 16px; margin-top: 10px;">
              Create Your WITDAY Image →
            </a>
          </div>
          
          <div style="border-left: 4px solid #7c3aed; padding-left: 20px; margin: 25px 0;">
            <h3 style="color: #7c3aed; margin: 0 0 10px 0;">What's Next?</h3>
            <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
              <li>Explore our community and connect with other women in tech</li>
              <li>Create your WITDAY Ambassador image to showcase your commitment</li>
              <li>Share your story and inspire the next generation</li>
              <li>Participate in upcoming events and networking opportunities</li>
            </ul>
          </div>
          
          <p style="font-size: 16px; color: #374151; line-height: 1.6; margin-bottom: 30px;">
            We're excited to have you as part of our mission to empower, innovate, and elevate women in technology worldwide.
          </p>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              <strong>Note:</strong> This is an automated message. Please do not reply to this email.
            </p>
          </div>
          
          <div style="border-top: 1px solid #e5e7eb; margin-top: 30px; padding-top: 20px; text-align: center;">
            <p style="color: #374151; margin: 0; font-weight: 500;">Best regards,</p>
            <p style="color: #7c3aed; margin: 5px 0 0 0; font-weight: bold;">The WomenInTech Network Team</p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            © 2024 WomenInTech Network. Empowering women in technology worldwide.
          </p>
        </div>
      </div>
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
