import axios, { Method } from "axios";
import { MemosData } from "../types/types";
import * as Constants from "../utils/constants";

export async function apiRequest(
  method: Method,
  id: string | number = `?user_id=${Constants.API_ID}`,
  data?: MemosData
) {
  const request = await axios({
    method: method,
    url: `${Constants.URL}/${id}`,
    data: data,
    headers: {
      authorization: `Bearer ${Constants.API_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  return request;
}
