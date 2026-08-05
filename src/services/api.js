export async function sendChat({ systemPrompt, messages }) {
  const response = await fetch("/api/functions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ systemPrompt, messages }),
  });

  if (!response.ok) {
    throw new Error("La petición falló");
  }

  const data = await response.json();
  return data.text;
}