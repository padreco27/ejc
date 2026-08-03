import { NextRequest, NextResponse } from "next/server";
import { createItem, deleteItem, getItems, updateItem } from "@/lib/db";

export async function GET() {
  const data = await getItems("equipes");
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const item = await createItem("equipes", payload);
  return NextResponse.json(item, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { id, ...rest } = body;
  if (!id) {
    return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
  }
  const updated = await updateItem("equipes", id, rest);
  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  if (!id) {
    return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
  }
  await deleteItem("equipes", id);
  return NextResponse.json({ success: true });
}
