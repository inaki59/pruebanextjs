import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string; chatId: string } }
) {
  const { message } = await req.json();
  const { userId, chatId } = params;

  if (!message) return NextResponse.json({ error: "Mensaje vacío" }, { status: 400 });

  const filePath = path.join(process.cwd(), "data", `${userId}.json`);

  try {
    const file = await fs.readFile(filePath, "utf8");
    const userData = JSON.parse(file);
    const chat = userData.chats.find((c: any) => c.id === chatId);

    if (!chat) return NextResponse.json({ error: "Chat no encontrado" }, { status: 404 });

    chat.messages.push({ role: "user", content: message });
    chat.messages.push({ role: "bot", content: "Respuesta automática 🤖" });

    await fs.writeFile(filePath, JSON.stringify(userData, null, 2), "utf8");

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error al escribir en el archivo" }, { status: 500 });
  }
}
