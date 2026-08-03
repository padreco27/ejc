import { readData, writeData } from "@/lib/data-utils";
import { supabaseAdmin, hasSupabase } from "@/lib/supabase";

export type TableName =
  | "blog"
  | "produtos"
  | "galeria"
  | "agenda"
  | "inscricoes"
  | "equipes"
  | "eventos"
  | "faq"
  | "testemunhos";

function assertSupabaseAdmin() {
  if (!supabaseAdmin) {
    throw new Error("Supabase não está configurado.");
  }
}

const FALLBACK_FILES: Record<TableName, string> = {
  blog: "blog.json",
  produtos: "produtos.json",
  galeria: "galeria.json",
  agenda: "agenda.json",
  inscricoes: "inscricoes.json",
  equipes: "equipes.json",
  eventos: "eventos.json",
  faq: "faq.json",
  testemunhos: "testemunhos.json",
};

async function readFallback<T = any>(table: TableName): Promise<T[]> {
  return readData(FALLBACK_FILES[table]) as Promise<T[]>;
}

async function writeFallback(table: TableName, data: unknown[]) {
  return writeData(FALLBACK_FILES[table], data);
}

export async function getItems<T = any>(table: TableName): Promise<T[]> {
  if (hasSupabase) {
    assertSupabaseAdmin();
    const response = await supabaseAdmin.from(table).select("*").order("id", { ascending: true });
    if (response.error) {
      throw response.error;
    }
    return response.data as T[];
  }

  return readFallback<T>(table);
}

export async function getItemById<T = any>(table: TableName, id: number): Promise<T | null> {
  if (hasSupabase) {
    assertSupabaseAdmin();
    const response = await supabaseAdmin.from(table).select("*").eq("id", id).single();
    if (response.error && response.status !== 406) {
      throw response.error;
    }
    return response.data as T | null;
  }

  const items = await readFallback<T>(table);
  return items.find((item: any) => item.id === id) ?? null;
}

export async function getItemBySlug<T = any>(table: TableName, slug: string): Promise<T | null> {
  if (hasSupabase) {
    assertSupabaseAdmin();
    const response = await supabaseAdmin.from(table).select("*").eq("slug", slug).single();
    if (response.error && response.status !== 406) {
      throw response.error;
    }
    return response.data as T | null;
  }

  const items = await readFallback<T>(table);
  return items.find((item: any) => item.slug === slug) ?? null;
}

export async function createItem<T = any>(table: TableName, payload: unknown): Promise<T> {
  if (hasSupabase) {
    assertSupabaseAdmin();
    const response = await supabaseAdmin.from(table).insert(payload).select().single();
    if (response.error) {
      throw response.error;
    }
    return response.data as T;
  }

  const items = await readFallback<T>(table);
  const maxId = items.reduce((max, item: any) => Math.max(max, item?.id ?? 0), 0);
  const newItem = { ...(payload as object), id: maxId + 1 } as T;
  items.push(newItem);
  await writeFallback(table, items as unknown[]);
  return newItem;
}

export async function updateItem<T = any>(table: TableName, id: number, payload: unknown): Promise<T> {
  if (hasSupabase) {
    assertSupabaseAdmin();
    const response = await supabaseAdmin
      .from(table)
      .update(payload)
      .eq("id", id)
      .select()
      .single();
    if (response.error) {
      throw response.error;
    }
    return response.data as T;
  }

  const items = await readFallback<T>(table);
  const index = items.findIndex((item: any) => item.id === id);
  if (index === -1) {
    throw new Error("Item não encontrado");
  }
  items[index] = { ...items[index], ...(payload as object) } as T;
  await writeFallback(table, items as unknown[]);
  return items[index];
}

export async function deleteItem(table: TableName, id: number): Promise<void> {
  if (hasSupabase) {
    assertSupabaseAdmin();
    const response = await supabaseAdmin.from(table).delete().eq("id", id);
    if (response.error) {
      throw response.error;
    }
    return;
  }

  const items = await readFallback(table);
  const index = items.findIndex((item: any) => item.id === id);
  if (index === -1) {
    throw new Error("Item não encontrado");
  }
  items.splice(index, 1);
  await writeFallback(table, items as unknown[]);
}
