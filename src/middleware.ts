import { NextRequest, NextResponse } from "next/server";

const MAX_REQUESTS = 50;
const COOLDOWN_TIME = 30 * 60 * 1000;
const IS_LOCAL = process.env.IS_LOCAL === "true";
const COOKIE_NAME = "__gj4wt02w9rsoj2";

export function middleware(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json("Method not allowed", { status: 405 });
  }

  const allowedOrigins = [
    "https://my-web-portofolio-pearl.vercel.app",
    "https://lananglanusa.my.id",
  ];
  
  if (IS_LOCAL) {
    allowedOrigins.push(
      "http://localhost:3008",
      "http://10.194.59.52:3008",
    );
  }
  
  const origin = req.headers.get("origin") || req.nextUrl.origin;
  if (!allowedOrigins.includes(origin)) {
    return NextResponse.json("Access denied", { status: 403 });
  }

  const cookies = req.cookies.get(COOKIE_NAME);
  let requestData = { count: 0, lastRequestTime: Date.now() };

  if (cookies) {
    try {
      requestData = JSON.parse(cookies.value);
    } catch (e) {
      console.error("Failed to parse cookie:", e);
    }
  }

  const now = Date.now();
  if (requestData.count >= MAX_REQUESTS) {
    const timePassed = now - requestData.lastRequestTime;
    if (timePassed < COOLDOWN_TIME) {
      return NextResponse.json("You have reached the maximum conversation limit, please try again in 30 minutes.", { status: 429 });
    } else {
      requestData.count = 0;
    }
  }

  requestData.count += 1;
  requestData.lastRequestTime = now;

  const response = NextResponse.next();
  response.cookies.set(COOKIE_NAME, JSON.stringify(requestData), {
    maxAge: 30 * 60,
    httpOnly: true,
  });

  return response;
}

export const config = {
  // matcher: "/api/:path*",
  matcher: "/api/ask-to-ai",
};
