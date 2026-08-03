import { cookies } from "next/headers";
import { supabaseAdmin, hasSupabase } from "@/lib/supabase";

const SESSION_COOKIE = "ejc_admin";

export async function verifyAdminCredentials(email: string, password: string) {
  if (!hasSupabase || !supabaseAdmin) {
    return {
      success: false,
      message: "Supabase não está configurado. Não é possível autenticar.",
    };
  }

  const { data, error } = await supabaseAdmin.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.session) {
    return { success: false, message: error?.message || "Credenciais inválidas" };
  }

  return { success: true, session: data.session, user: data.user };
}

export async function createSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export async function verifySession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    return cookieStore.has(SESSION_COOKIE);
  } catch {
    return false;
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
