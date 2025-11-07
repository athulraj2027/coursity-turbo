import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

const SECRET = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("coursity_token")?.value;
  const { pathname } = req.nextUrl;

  const publicPaths = ["/", "/sign-in", "/sign-up", "/verify-otp"];

  // If no token and trying to access protected route
  if (!token && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (token) {
    try {
      const decoded = await jose.jwtVerify(token, SECRET);
      const role = decoded.payload.role;

      // Example: Role-based redirect
      if (pathname.startsWith("/admin") && role !== "ADMIN") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }

      if (pathname.startsWith("/teacher") && role !== "TEACHER") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    } catch (err) {
      // Token invalid or expired
      console.error("JWT Error:", err);
      const loginUrl = new URL("/sign-in", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // ✅ Allow request
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
