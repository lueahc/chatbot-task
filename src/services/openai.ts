import { OpenAI } from "openai";
import { config } from "../config";

const openai = new OpenAI({
  apiKey: config.OPENAI_API_KEY,
});

export const createStreamResponse = async (prompt: string) => {
  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      stream: true,
    });
    for await (const chunk of stream) {
      process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }
  } catch (error) {
    throw new Error("OpenAI Stream Error");
  }
};

export const createNonStreamResponse = async (
  prompt: string
): Promise<string> => {
  try {
    const nonStream = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });
    return (
      nonStream.choices[0].message?.content?.replace(/\n\n/g, "").trim() || ""
    );
  } catch (error) {
    throw new Error("OpenAI Non-stream Error");
  }
};
