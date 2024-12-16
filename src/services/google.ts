import axios from "axios";
import google from "googlethis";
import { config } from "../config";

export const searchGoogle = async (query: string): Promise<string[]> => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/customsearch/v1`,
      {
        params: {
          q: query,
          cx: config.GOOGLE_CSE_ID,
          key: config.GOOGLE_API_KEY,
        },
      }
    );
    //console.log("search response: ", response.data.items);

    //return response.data.items?.map((item: any) => item.title) || [];
    return response.data.items?.map((item: any) => item.snippet) || [];
  } catch (error) {
    throw new Error("Google Error");
  }
};
