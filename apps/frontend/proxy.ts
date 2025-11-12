import { NextResponse, NextRequest } from "next/server";
import * as jose from "jose";
const SECRET = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const token = request.cookies.get("coursity_token")?.value;
  console.log("token received for middleware :  ", token);

  const { pathname } = request.nextUrl;

  const publicPaths = ["/", "/sign-in", "/sign-up", "/verify-otp"];
  const commonPaths = ["/success", "/error"];

  const isPublic = publicPaths.some((path) => pathname === path);

  if (!token && !isPublic) {
    console.log("No token found, redirecting to signin page");
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  if (token) {
    try {
      const decoded = await jose.jwtVerify(token, SECRET);
      console.log("decoded : ", decoded);

      const role = decoded.payload.role as string;
      const roleRoute = role.toLowerCase();

      if (token && isPublic) {
        return NextResponse.redirect(new URL(`/${roleRoute}`, request.url));
      }

      if (token && !pathname.startsWith(`/${roleRoute}`)) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
      // if(token)
    } catch (error) {
      console.error("JWT Error:", error);
      const loginUrl = new URL("/sign-in", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
}

export const config = {
  matcher: [
    "/",
    "/sign-in",
    "/verify-otp",
    "/sign-up",
    "/admin/:path*",
    "/teacher/:path*",
    "/student/:path*",
    "/unauthorized",
  ],
};
