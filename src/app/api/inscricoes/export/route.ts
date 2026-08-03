import { NextResponse } from "next/server";
import { getItems } from "@/lib/db";
import * as XLSX from "xlsx";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatInscricao(item: any) {
  return {
    ID: item.id,
    Nome: item.nome || "",
    "Data de Nascimento": item.dataNascimento || "",
    CPF: item.cpf || "",
    RG: item.rg || "",
    Telefone: item.telefone || "",
    Email: item.email || "",
    Instagram: item.instagram || "",
    CEP: item.cep || "",
    Endereço: item.endereco || "",
    Número: item.numero || "",
    Bairro: item.bairro || "",
    Cidade: item.cidade || "",
    Estado: item.estado || "",
    "Paróquia que Frequenta": item.paroquiaFrequenta || "",
    Sacramentos: Array.isArray(item.sacramentos) ? item.sacramentos.join(", ") : "",
    "Restrição Alimentar": item.restricaoAlimentar || "",
    "Alergia/Medicamento": item.alergiaMedicamento || "",
    "Contato Emergência - Nome": item.contatoEmergenciaNome || "",
    "Contato Emergência - Telefone": item.contatoEmergenciaTelefone || "",
    Parentesco: item.parentesco || "",
    Status: item.status || "Confirmada",
    "Data de Inscrição": item.createdAt
      ? new Date(item.createdAt).toLocaleDateString("pt-BR")
      : "",
  };
}

export async function GET() {
  const data = await getItems("inscricoes");
  const formatted = data.map(formatInscricao);

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(formatted);

  XLSX.utils.book_append_sheet(wb, ws, "Inscrições");

  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

  return new NextResponse(buf, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="inscricoes-ejc-${new Date().toISOString().split("T")[0]}.xlsx"`,
    },
  });
}
