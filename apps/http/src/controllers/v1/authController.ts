import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key_here_change_it";

import prisma from "@repo/db/client";
import { generateOTP } from "../../utils/otp";
import { sendEmail } from "../../helpers/mail";
import { SignOptions } from "jsonwebtoken";

const sendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // check for existing user
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const existingOTP = await prisma.otp.findFirst({
      where: { email },
      orderBy: { createdAt: "desc" }, // if you have a createdAt field
    });

    if (existingOTP?.createdAt) {
      const timeSinceLastOtp = Date.now() - existingOTP.createdAt.getTime();

      // less than 60 seconds (1 minute)
      if (timeSinceLastOtp < 60 * 1000) {
        const waitTime = Math.ceil((60 * 1000 - timeSinceLastOtp) / 1000);
        return res.status(429).json({
          message: `Please wait ${waitTime} seconds before requesting another OTP.`,
        });
      }
    }

    // creating otp and expiration time
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await prisma.otp.deleteMany({ where: { email } });

    // create otp in db
    await prisma.otp.create({ data: { code: otp, email, expiresAt } });

    // sending otp
    await sendEmail({
      to: email,
      subject: "Your Coursity OTP Code",
      html: `
        <div style="font-family:Arial; padding:20px">
          <h2>Welcome to Coursity 🎓</h2>
          <p>Your OTP code is:</p>
          <h1 style="color:#007bff">${otp}</h1>
          <p>This code is valid for 5 minutes.</p>
        </div>
      `,
    });

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log("Error in sending OTP : ", error);
    return res.status(500).json({ message: "Couldn't send OTP" });
  }
};

const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, password, otp, username, role } = req.body;
    const verifiedOTP = await prisma.otp.findFirst({
      where: { email, code: otp, expiresAt: { gt: new Date() } },
    });

    if (!verifiedOTP) return res.status(400).json({ message: "Invalid OTP" });

    const hashedPassword = await bcrypt.hash(password, 10);

    if (role !== "TEACHER" || role !== "STUDENT")
      return res.status(403).json({ message: "Invalid role" });

    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword, role, username },
    });

    if (role === "TEACHER") {
      await prisma.studentProfile.create({ data: { userId: newUser.id } });
    } else if (role === "STUDENT") {
      await prisma.teacherProfile.create({ data: { userId: newUser.id } });
    }

    await prisma.otp.delete({ where: { id: verifiedOTP.id } });

    const options: SignOptions = { expiresIn: "7d" };
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      options
    );
    return res.json({
      message: "User created",
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
      },
      token,
    });
  } catch (error) {
    console.log("Error in verifying OTP : ", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.password !== password)
      return res.status(400).json({ message: "Invalid credentials" });

    const options: SignOptions = { expiresIn: "7d" };
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      options
    );

    return res.status(201).json({
      message: "Logged in successfully",
      user: { id: user.id, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    console.log("Error in logging in : ", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default { sendOtp, verifyOtp, login };
