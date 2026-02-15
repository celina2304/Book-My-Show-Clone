import crypto from "crypto";

const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32); // Store securely (env var)
const iv = crypto.randomBytes(16);

export function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return { iv: iv.toString("hex"), data: encrypted };
}

export function decrypt(encryptedData) {
  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(encryptedData.iv, "hex"));
  let decrypted = decipher.update(encryptedData.data, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
