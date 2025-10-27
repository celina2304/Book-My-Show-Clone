import { createGmailTransporter } from "../config/gmail.config.js";

export const sendGmail = async ({ to, subject, html }) => {
  try {
    const transporter = await createGmailTransporter();
    return transporter.sendMail({
      from: `No Reply <${process.env.GMAIL_SENDER_EMAIL}>`,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// import { loadTemplate } from "../utils/loadTemplate.js";

// const html_base = loadTemplate("otp", {
//   appName: "Book my show clone",
//   appShort: "BM",
//   ticketId: Math.floor(Math.random() * 900000) + 100000,
//   userName: userName || "User",
//   expiryMinutes: 10,
//   supportEmail: "celina2304dev@proton.me",
//   maskedEmail: to,
//   year: new Date().getFullYear(),
//   // actionUrl: "https://myapp.com/verify",
//   requestIp: "127.0.0.1",
//   d1: otp[0],
//   d2: otp[1],
//   d3: otp[2],
//   d4: otp[3],
//   d5: otp[4],
//   d6: otp[5],
// });