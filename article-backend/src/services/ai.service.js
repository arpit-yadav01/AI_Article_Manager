import Groq from "groq-sdk";

export const summarizeText = async (text) => {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

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


export const rewriteText = async (text) => {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

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

export const findMistakes = async (text) => {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

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
