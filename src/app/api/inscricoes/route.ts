import { NextRequest, NextResponse } from "next/server";
import { createItem, deleteItem, getItems, updateItem } from "@/lib/db";

export async function GET() {
  const data = await getItems("inscricoes");
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const item = await createItem("inscricoes", {
    ...body,
    createdAt: new Date().toISOString(),
    status: "Confirmada",
  });
  return NextResponse.json(item, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { id, ...rest } = body;
  if (!id) {
    return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
  }
  const updated = await updateItem("inscricoes", id, rest);
  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  if (!id) {
    return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
  }
  await deleteItem("inscricoes", id);
  return NextResponse.json({ success: true });
}
