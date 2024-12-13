import axios from "axios";
import google from "googlethis";
import { config } from "../config";

export async function searchGoogle(query: string): Promise<string[]> {
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
    return response.data.items?.map((item: any) => item.title) || [];
  } catch (error) {
    throw new Error("Google Error");
  }

  // const options = {
  //   page: 0,
  //   safe: false,
  //   parse_ads: false,
  //   additional_params: {
  //     hl: "ko",
  //   },
  // };

  // try {
  //   const response = await google.search(query, options);
  //   return response.results.map((item: any) => item.title) || [];
  // } catch (err) {
  //   throw new Error("GoogleThis Error");
  // }
}
