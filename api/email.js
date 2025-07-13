import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import cors from 'cors';

import dotenv from "dotenv";
dotenv.config();


const corsMiddleware = cors({
    origin: '*', 
    methods: ['POST', 'OPTIONS'], 
  });
 
  
  
  
export default async function handler(req, res) {
  
    corsMiddleware(req, res, async () => {
   

      

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message, to, subject, html } = req.body;

  if (!name || !email || !message || !to || !subject || !html) {
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
      to: to,
      subject: subject,
      html: html,
    });

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});
}
