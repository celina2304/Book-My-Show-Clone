import nodemailer from "nodemailer";
import { google } from "googleapis";

import config from "../config/config.js";

const oAuth2Client = new google.auth.OAuth2(
  config.gmail.client_id,
  config.gmail.client_secret,
  config.gmail.redirect_uri
);

oAuth2Client.setCredentials({
  refresh_token: config.gmail.refresh_token,
});

export const sendEmail = async (to, subject, text) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: config.gmail.sender_email,
        clientId: config.gmail.client_id,
        clientSecret: config.gmail.client_secret,
        refreshToken: config.gmail.refresh_token,
        accessToken: accessToken?.token,
      },
    });

    const mailOptions = {
      from: `Celina <${config.gmail.sender_email}>`,
      to,
      subject,
      text,
    };

    const result = await transporter.sendMail(mailOptions);
    // console.log("Email sent successfully:", result);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; 
  }
};

