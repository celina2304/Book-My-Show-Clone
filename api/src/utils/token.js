// generate token
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwt.secret, {
    expiresIn: config.jwt.expire,
  });
};

export const verifyJwt = (userId) => {
  return jwt.verify(userId, config.jwt.secret);
};
