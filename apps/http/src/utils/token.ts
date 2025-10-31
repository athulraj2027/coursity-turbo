import jwt from "jsonwebtoken";

const JWT_SECRET =
  (process.env.JWT_SECRET as string) || "super_secret_key_here_change_it";

export const generateToken = (payload: object, expiresIn = "7d") => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn } as jwt.SignOptions);
};
