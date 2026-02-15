import emailjs from "@emailjs/nodejs";
import config from "../config/config.js";

export async function sendEmail(email, name = "User", otp) {
  await emailjs.send(
    config.emailjs.service_id,
    config.emailjs.template_id,
    {
      appName: "Book my show clone",
      appShort: "BMS",
      ticketId: Math.floor(Math.random() * 900000) + 100000,
      userName: name,
      expiryMinutes: 10,
      supportEmail: "celina2304dev@proton.me",
      maskedEmail: email,
      year: new Date().getFullYear(),
      d1: otp[0],
      d2: otp[1],
      d3: otp[2],
      d4: otp[3],
      d5: otp[4],
      d6: otp[5],
    },
    {
      publicKey: config.emailjs.public_key,
      privateKey: config.emailjs.private_key,
    }
  );
}
