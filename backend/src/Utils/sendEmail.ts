import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
type options = {
  email: string;
  subject: string;
  message: string;
};
const sendEmail = async (options: options) => {
  const smtpConfig: SMTPTransport.Options = {
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.MAIL_EMAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  };
  const transporter = nodemailer.createTransport(smtpConfig);

  const mailOptions = {
    from: process.env.MAIL_EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
