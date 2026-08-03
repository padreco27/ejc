import { NextRequest, NextResponse } from "next/server";
import { createSession, verifyAdminCredentials } from "@/lib/admin/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "E-mail e senha são obrigatórios" },
        { status: 400 }
      );
    }

    const result = await verifyAdminCredentials(email, password);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 401 }
      );
    }

    await createSession();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, message: "Erro interno" },
      { status: 500 }
    );
  }
}
