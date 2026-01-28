// server/utils/sendEmail.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,       // your Gmail
    pass: process.env.EMAIL_PASS,       // app password (not regular password)
  },
});

export const sendContactEmail = async (contactData) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'your-admin-email@gmail.com',
    subject: 'New Contact Form Submission',
    text: `Name: ${contactData.name}\nEmail: ${contactData.email}\nMobile: ${contactData.mobile}\nMessage: ${contactData.message}`,
  };

  await transporter.sendMail(mailOptions);
};