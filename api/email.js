import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

import dotenv from "dotenv";
dotenv.config();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields required' });
  }

  try {
    const transporter = nodemailer.createTransport(smtpTransport({
        host: `${process.env.SMTP_HOST}`,
        port:  `${process.env.SMTP_PORT}`,
        secure: false,
        auth: {
          user: `${process.env.SMTP_MAIL}`,
          pass: `${process.env.SMTP_PASSWORD}`,
        },
        tls:{
            rejectUnauthorized: false,
        }
      }));

    await transporter.sendMail({
      from: `${process.env.SMTP_MAIL}`,
      to: `${process.env.SMTP_TO}`,
      subject: 'New Contact Form Message',
      html: `
        <h3>New Message from FBD Website</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
}
