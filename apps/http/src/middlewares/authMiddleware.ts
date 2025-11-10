import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthUser {
  id: string;
  role: string;
  email: string;
  teacherProfileId?: string;
  studentProfileId?: string;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  console.log("cookies received   :",req.cookies);
  // ✅ 2️⃣ If not found, look for cookie
  if (!token && req.cookies) {
    token = req.cookies["coursity_token"];
  }

  // ✅ 3️⃣ If still no token → reject
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  console.log("Token received for verification:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthUser;
    req.user = decoded;
    console.log(req.user);
    console.log("Authenticated user:", req.user);
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const authorize = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user)
      return res.status(403).json({ message: "User not authenticated" });
    if (!allowedRoles.includes(req.user.role))
      return res.status(403).json({ message: "Access denied" });
    next();
  };
};
