import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "jwt_secret_key",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  GOOGLE_CSE_ID: process.env.GOOGLE_CSE_ID,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};
