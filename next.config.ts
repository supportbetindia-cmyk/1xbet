import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";

  if (
    hostname === "1xbetgames.co" ||
    hostname === "1xbetgames.co:443"
  ) {
    const url = request.nextUrl.clone();
    url.hostname = "www.1xbetgames.co";

    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};