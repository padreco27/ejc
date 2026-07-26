import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await import("next/headers").then((m) => m.cookies());
    const isAuthenticated = cookieStore.has("ejc_admin");
    return NextResponse.json({ authenticated: isAuthenticated });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
