import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const profileImage = formData.get("profileImage") as File;

    console.log('Received image info:', {
      name: profileImage?.name,
      size: profileImage?.size,
      type: profileImage?.type
    });

    if (!name || !email || !profileImage) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a transporter object using SMTP credentials
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // true for port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Process the generated preview image from html2canvas
    const imageBuffer = await profileImage.arrayBuffer();
    const imageBufferNode = Buffer.from(imageBuffer);

    // Extract first name for personalization
    const firstName = name.split(',')[0].trim();

    // Create the email content
    const mailOptions = {
      from: `"WomenInTech" <${process.env.SMTP_USER}>`,
      replyTo: "noreply@womenintech.com",
      to: email,
      subject: "Your Women in Tech Day Image is Ready! 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
          <div style="background: linear-gradient(135deg, #7c3aed, #a855f7); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Your Women in Tech Day Image is Ready! 🎉</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <p style="font-size: 18px; color: #374151; margin-bottom: 20px;">Dear ${firstName},</p>
            
            <p style="font-size: 16px; color: #374151; line-height: 1.6; margin-bottom: 20px;">
              Thank you for becoming a Women in Tech Day <strong style="color: #7c3aed;">Ambassador!</strong> 🎊 Your personalized <strong style="color: #7c3aed;">ambassador</strong> image is ready and attached to this email.
            </p>
            
            <div style="background: linear-gradient(135deg, #06b6d4, #0891b2); padding: 25px; border-radius: 8px; margin: 25px 0; text-align: center;">
              <h2 style="color: white; margin: 0 0 15px 0; font-size: 22px;">📢 Share Your Impact!</h2>
              <p style="color: white; margin: 0; font-size: 16px; line-height: 1.5;">
                Share it on social media, your website, or with your community to showcase your support for inclusion in tech. Don't forget to use <strong>#WITDAY</strong> and tag us <strong>@WomenTech Network</strong> when you post! By spreading this message, you're helping to amplify the voices of women in technology and inspire the next generation of innovators.
              </p>
            </div>
            
            <div style="border-left: 4px solid #7c3aed; padding-left: 20px; margin: 25px 0;">
              <h3 style="color: #7c3aed; margin: 0 0 10px 0;">How to Use Your Image:</h3>
              <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li>Download the attached image</li>
                <li>Share on LinkedIn, Twitter, Instagram, or Facebook</li>
                <li>Use #WITDAY and tag @WomenTech Network</li>
                <li>Add it to your email signature or website</li>
                <li>Print it for events or conferences</li>
              </ul>
            </div>
            
            <p style="font-size: 16px; color: #374151; line-height: 1.6; margin-bottom: 30px;">
              Together, we're building a more inclusive tech industry. Thank you for being part of this important movement!
            </p>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                <strong>Note:</strong> This is an automated message. Please do not reply to this email.
              </p>
            </div>
            
            <div style="border-top: 1px solid #e5e7eb; margin-top: 30px; padding-top: 20px; text-align: center;">
              <p style="color: #374151; margin: 0; font-weight: 500;">Best,</p>
              <p style="color: #7c3aed; margin: 5px 0 0 0; font-weight: bold;">WomenTech Network Team</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              © 2024 WomenTech Network. Empowering women in technology worldwide.
            </p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `${firstName}_WITDAY_Ambassador.png`,
          content: imageBufferNode,
          contentType: 'image/png'
        }
      ]
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      success: true, 
      message: "Your WITDAY Ambassador image has been sent to your email!" 
    });

  } catch (error) {
    console.error("WITDAY Ambassador submission error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process your submission. Please try again." },
      { status: 500 }
    );
  }
} 