import nodemailer from "nodemailer";
import { google } from "googleapis";
import config from "./config.js";

const {
  client_id,
  client_secret,
  refresh_token,
  redirect_uri,
  sender_email,
} = config.gmail;

export const createGmailTransporter = async () => {
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uri
  );

  oAuth2Client.setCredentials({
    refresh_token: refresh_token,
  });

  const accessToken = await oAuth2Client.getAccessToken();

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: sender_email,
      clientId: client_id,
      clientSecret: client_secret,
      refreshToken: refresh_token,
      accessToken: accessToken.token,
    },
  });
};
