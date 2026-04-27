import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const processChatMessage = async (message: string): Promise<string> => {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    console.error("GOOGLE_API_KEY não encontrada");
    return "Erro interno: chave da API não configurada.";
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);

    // Modelo recomendado (rápido, barato e compatível)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(message);
    const reply = result.response.text();

    return reply || "Não consegui gerar resposta.";
  } catch (err) {
    console.error("Erro no Gemini:", err);
    return "Erro ao gerar resposta do Gemini.";
  }
};
