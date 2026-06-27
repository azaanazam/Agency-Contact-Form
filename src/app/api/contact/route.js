import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const { name, email, phone, message } = await request.json();

        if (!name || !email || !phone || !message) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"${name}" <${process.env.EMAIL_USER}>`,
            to: process.env.RECEIVER_EMAIL,
            replyTo: email,
            subject: `🚀 New Agency Lead from ${name}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; background-color: #0f172a; color: #fff;">
                    <div style="max-width: 600px; margin: 0 auto; background: #1e293b; padding: 30px; border-radius: 12px; border: 1px solid #334155;">
                        <h2 style="color: #818cf8; margin-bottom: 20px;">New Website Inquiry</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                        <div style="background: #0f172a; padding: 15px; border-left: 4px solid #c084fc; margin-top: 20px; border-radius: 4px;">
                            <p><strong>Message:</strong></p>
                            <p style="line-height: 1.6; color: #cbd5e1;">${message}</p>
                        </div>
                    </div>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to send email" }, { status: 500 });
    }
}