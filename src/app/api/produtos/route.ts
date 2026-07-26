import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/data-utils";

const FILE = "produtos.json";

export async function GET() {
  const data = await readData(FILE);
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const data = await readData(FILE);
  const maxId = data.reduce((max, item) => Math.max(max, item.id), 0);
  const newItem = { ...body, id: maxId + 1 };
  data.push(newItem);
  await writeData(FILE, data);
  return NextResponse.json(newItem, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { id, ...rest } = body;
  if (!id) {
    return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
  }
  const data = await readData(FILE);
  const index = data.findIndex((item) => item.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Item não encontrado" }, { status: 404 });
  }
  data[index] = { ...data[index], ...rest };
  await writeData(FILE, data);
  return NextResponse.json(data[index]);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  if (!id) {
    return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
  }
  const data = await readData(FILE);
  const index = data.findIndex((item) => item.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Item não encontrado" }, { status: 404 });
  }
  data.splice(index, 1);
  await writeData(FILE, data);
  return NextResponse.json({ success: true });
}
