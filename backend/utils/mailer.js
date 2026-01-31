import nodemailer from "nodemailer";
import { env } from "../config/env.js";
import fs from "fs";
import path from "path";

const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  secure: false,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

export const sendEmail = async ({ to, subject, template, variables }) => {
  const templatePath = path.join(process.cwd(), "template", template);

  let html = fs.readFileSync(templatePath, "utf-8");

  Object.entries(variables).forEach(([key, value]) => {
    html = html.replaceAll(`{{${key}}}`, value);
  });

  await transporter.sendMail({
    from: env.EMAIL_FROM,
    to,
    subject,
    html,
  });
};
