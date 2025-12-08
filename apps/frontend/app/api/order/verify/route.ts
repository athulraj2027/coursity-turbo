export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import { cookies } from "next/headers";

const RAZORPAY_SECRET = process.env.RAZORPAY_KEY_SECRET;

export async function POST(req: NextRequest) {
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });
  const cookieStore = await cookies();
  const token = cookieStore.get("coursity_token")?.value;
  const {
    razorpayOrderId,
    razorpaySignature,
    razorpayPaymentId,
    email,
    courseId,
  } = await req.json();
  const body = razorpayOrderId + "|" + razorpayPaymentId;

  const expectedSignature = crypto
    .createHmac("sha256", RAZORPAY_SECRET!)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpaySignature;

  if (!isAuthentic) {
    return NextResponse.json(
      { message: "invalid payment signature", error: true },
      { status: 400 }
    );
  }

  const data = await enrollCourse(email, courseId, token);
  return NextResponse.json(
    { message: "payment success", error: false },
    { status: 200 }
  );
}

const enrollCourse = async (email: string, courseId: string, token: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/courses/enroll/${courseId}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `coursity_token=${token}`,
      },
      body: JSON.stringify({ email }),
    }
  );

  console.log(res);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Enrolling failed.");
  }
  return data;
};
