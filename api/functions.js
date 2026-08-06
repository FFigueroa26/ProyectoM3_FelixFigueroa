export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método no permitido" });
    return;
  }

  const { systemPrompt, messages } = req.body ?? {};

  if (!systemPrompt || !Array.isArray(messages)) {
    res.status(400).json({ error: "Faltan systemPrompt o messages" });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Falta la API key de Gemini en el servidor" });
    return;
  }

  const contents = messages.map((msg) => ({
    role: msg.role === "user" ? "user" : "model",
    parts: [{ text: msg.content }],
  }));

  const requestBody = {
    systemInstruction: { parts: [{ text: systemPrompt }] },
    contents,
    generationConfig: { temperature: 0.9 },
  };

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify(requestBody),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Error de Gemini:", data);
      const status = response.status;
      const isRateLimit = status === 429;
      res.status(status).json({
        error: isRateLimit
          ? "Se alcanzó el límite de peticiones de la API"
          : "Error al contactar a Gemini",
      });
      return;
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    res.status(200).json({ text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
