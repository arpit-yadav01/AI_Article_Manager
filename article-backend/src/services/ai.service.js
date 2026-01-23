import Groq from "groq-sdk";

const createGroqClient = () =>
  new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

/**
 * 🧠 Summarize article
 */
export const summarizeText = async (text) => {
  const groq = createGroqClient();

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: "You summarize articles clearly for students.",
      },
      {
        role: "user",
        content: `Summarize this article in 4 bullet points:\n\n${text}`,
      },
    ],
  });

  return completion.choices[0].message.content;
};

/**
 * ✨ Improve writing quality
 */
export const rewriteText = async (text) => {
  const groq = createGroqClient();

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content:
          "You are an expert writing assistant. Improve clarity, grammar, and flow without changing meaning.",
      },
      {
        role: "user",
        content: `Rewrite and improve the following article:\n\n${text}`,
      },
    ],
  });

  return completion.choices[0].message.content;
};

/**
 * 🔍 Find mistakes & suggestions
 */
export const findMistakesText = async (text) => {
  const groq = createGroqClient();

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content:
          "You are a writing reviewer. Identify grammar issues, clarity problems, and give suggestions. Do not rewrite the text.",
      },
      {
        role: "user",
        content: `Analyze the following article and list mistakes and suggestions:\n\n${text}`,
      },
    ],
  });

  return completion.choices[0].message.content;
};

/**
 * 💡 Suggest how to continue writing (CORE FEATURE)
 */
export const generateWritingIdeas = async ({ title, content }) => {
  const groq = createGroqClient();

  const prompt = `
You are a writing assistant.

The user is writing an article and feels stuck.
Suggest ideas on how they can continue writing.

Rules:
- Do NOT rewrite existing content
- Do NOT complete the article
- Do NOT repeat the text
- Provide bullet-point ideas only
- Keep suggestions concise and helpful

Article Title:
"${title}"

Current Content:
"${content}"
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: "You help writers with ideas only." },
      { role: "user", content: prompt },
    ],
    temperature: 0.6,
  });

  const rawText = response.choices[0].message.content;

  // Normalize bullets → clean array
  return rawText
    .split("\n")
    .map((line) => line.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean);
};
