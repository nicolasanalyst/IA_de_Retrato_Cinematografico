import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("A variável de ambiente API_KEY não foi definida");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateArtisticImage = async (prompt: string, base64ImageData: string, mimeType: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
    
    throw new Error("Nenhum dado de imagem encontrado na resposta da API.");
  } catch (error) {
    console.error("Erro ao chamar a API Gemini:", error);
    throw new Error("Falha ao gerar a imagem. Verifique o console para mais detalhes.");
  }
};