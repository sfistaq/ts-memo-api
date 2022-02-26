import axios, { CancelTokenSource, Method } from "axios";
import { MemosData, AddMemoData } from "../types";
import * as Constants from "../helpers";

export let cancelToken: CancelTokenSource;

export async function apiRequest(
  method: Method,
  id: string | number = `?user_id=${Constants.API_ID}`,
  data?: MemosData | AddMemoData
) {
  cancelToken = axios.CancelToken.source();

  const request = await axios({
    method: method,
    url: `${Constants.URL}/${id}`,
    data: data,
    headers: {
      authorization: `Bearer ${Constants.API_TOKEN}`,
      "Content-Type": "application/json",
    },
    cancelToken: cancelToken.token,
  });

  return request;
}
