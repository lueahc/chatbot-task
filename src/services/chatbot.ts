import { searchGoogle } from "./google";
import { createNonStreamResponse, createStreamResponse } from "./openai";

export async function ask(query: string, stream: boolean) {
  const result = await searchGoogle(query);
  const modifiedResult = result.slice(0, 3).join(" ");
  return stream
    ? createStreamResponse(modifiedResult)
    : createNonStreamResponse(modifiedResult);
}
