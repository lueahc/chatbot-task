import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function createStreamResponse(prompt: string) {
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
}

export async function createNonStreamResponse(prompt: string): Promise<string> {
  try {
    const nonStream = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });
    return nonStream.choices[0].message?.content?.trim() || "";
  } catch (error) {
    throw new Error("OpenAI Non-stream Error");
  }
}
