import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    console.log("💎 [M’JONG] Request:", req.body);

    const prompt = req.body.message || "Mensagem vazia";
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    console.log("💎 [M’JONG] Gemini response:", text);

    return res.status(200).json({ reply: text });
  } catch (error) {
    console.error("💎 [M’JONG] ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
}
