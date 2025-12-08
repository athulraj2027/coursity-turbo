import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("coursity_token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    const SECRET = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

    const { payload } = await jose.jwtVerify(token, SECRET);

    return NextResponse.json(
      {
        success: true,
        user: {
          id: payload.id,
          email: payload.email,
          role: payload.role,
          name: payload.name,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("ME Route Error:", error);

    return NextResponse.json(
      { error: "Unauthorized or Invalid Token" },
      { status: 401 }
    );
  }
}
