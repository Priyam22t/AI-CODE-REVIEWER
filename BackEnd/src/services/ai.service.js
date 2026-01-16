const fetch = require("node-fetch");

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

async function reviewCode(code, language = "JavaScript") {
  const prompt = `
You are a senior software engineer.

Analyze the following ${language} code and return:
- Code quality score (0–100)
- Security risk (Low / Medium / High)
- Performance rating (Poor / Average / Good)
- Issues found
- Suggestions
- Auto-fix example if possible

Code:
${code}
`;

  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost",
      "X-Title": "AI Code Reviewer"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an expert code reviewer." },
        { role: "user", content: prompt }
      ],
      temperature: 0.4
    })
  });

  const data = await response.json();

  if (!data.choices) {
    throw new Error("Invalid OpenRouter response");
  }

  return data.choices[0].message.content;
}

module.exports = { reviewCode };
