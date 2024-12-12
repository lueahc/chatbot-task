import axios from "axios";
import dotenv from "dotenv";
import google from "googlethis";

dotenv.config();
const API_KEY = process.env.GOOGLE_API_KEY;
const CSE_ID = process.env.GOOGLE_CSE_ID;

export async function searchGoogle(query: string): Promise<string[]> {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/customsearch/v1`,
      {
        params: {
          q: query,
          cx: CSE_ID,
          key: API_KEY,
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
