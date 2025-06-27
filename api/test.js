import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import multer from 'multer';
import * as dotenv from 'dotenv';
import ical from 'ical-generator';
import cors from 'cors';

dotenv.config();


const corsMiddleware = cors({
  origin: '*', 
  methods: ['POST', 'OPTIONS'], 
});





// Helper function to send an email


// The main handler function for the endpoint
export default async (req, res) => {
  // corsHandler(req, res); // Handle CORS
  corsMiddleware(req, res, async () => {
   
  });
};