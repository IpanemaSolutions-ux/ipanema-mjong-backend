import { processChatMessage } from "../chatEngine.js";

module.exports = async function handler(req, res) {
  // CORS liberado
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Pré‑verificação do navegador (CORS)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Só aceita POST
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
    console.error("Erro no servidor:", err);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}
