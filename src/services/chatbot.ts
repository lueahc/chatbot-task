import { searchGoogle } from "./google";
import { createNonStreamResponse, createStreamResponse } from "./openai";

const refineQuery = (query: string) => {
  return query.replace(/[^\w\s가-힣]/g, "");
};

export const ask = async (query: string, stream: boolean) => {
  const refinedQuery = refineQuery(query);
  const result = await searchGoogle(refinedQuery);
  //console.log("result: ", result);
  const prompt = `사용자가 "${query}"라고 질문했을 때의 적절한 대답을 "${result}"를 바탕으로 서론 없이 잘 생성해줘.`;
  //console.log("prompt", prompt);

  return stream
    ? createStreamResponse(prompt)
    : createNonStreamResponse(prompt);
};
