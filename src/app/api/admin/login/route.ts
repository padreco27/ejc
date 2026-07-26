import { NextRequest, NextResponse } from "next/server";
import { createSession, getAdminPassword } from "@/lib/admin/auth";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { success: false, message: "Senha é obrigatória" },
        { status: 400 }
      );
    }

    if (password !== getAdminPassword()) {
      return NextResponse.json(
        { success: false, message: "Senha incorreta" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true });
    const cookieStore = await import("next/headers").then((m) => m.cookies());
    cookieStore.set("ejc_admin", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, message: "Erro interno" },
      { status: 500 }
    );
  }
}
