import { processChatMessage } from "../chatEngine";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Mensagem não fornecida" });
  }

  try {
    const reply = await processChatMessage(message);
    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}
