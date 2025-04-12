import * as nodemailer from 'nodemailer';

export async function sendEmail(sendMailOptions: nodemailer.SendMailOptions) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  await transporter.sendMail(sendMailOptions);
}
