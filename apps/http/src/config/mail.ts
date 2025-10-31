import nodemailer from "nodemailer";

const host = process.env.SMTP_HOST;
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;

console.log("host : ", host);
console.log("user : ", user);
console.log("pass : ", pass);
export const transporter = nodemailer.createTransport({
  host: host as string,
  port: 587,
  secure: false,
  auth: {
    user: user as string,
    pass: pass as string,
  },
} as nodemailer.TransportOptions);
