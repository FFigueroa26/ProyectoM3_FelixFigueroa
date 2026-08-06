export async function sendChat({ systemPrompt, messages }) {
  const response = await fetch("/api/functions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ systemPrompt, messages }),
  });

  if (!response.ok) {
    const error = new Error("La petición falló");
    error.status = response.status;
    throw error;
  }

  const data = await response.json();
  return data.text;
}