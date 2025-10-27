import { google } from "googleapis";
import config from "../config/config.js";

const generateRefreshHandler = async () => {
  const oAuth2Client = new google.auth.OAuth2(
    config.gmail.client_id,
    config.gmail.client_secret,
    "http://localhost:3000/oauth2callback"
  );
  
  const SCOPES = ["https://www.googleapis.com/auth/gmail.send"];
  
  const url = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

//   const { tokens } = await oAuth2Client.getToken("4/0AVGzR1CSJ_A1SwgXHGB1NFWZdlfm9CGwl2V6ApGit5gDl_EjwBG16voLuCS62nzjve4cAA&scope=https://www.googleapis.com/auth/gmail.send");
// console.log(tokens);  // contains refresh_token

  
  // console.log("Authorize this URL:", url);
};

export default generateRefreshHandler;
