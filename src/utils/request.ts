import { IApiResponse } from "./../interfaces/apiResponse.interface";
interface RequestProps {
  url: string;
  method?: string;
  headers?: any;
  body?: any;
}

export const request = async ({
  url,
  method = "GET",
  headers = {},
  body,
}: RequestProps): Promise<IApiResponse> => {
  try {
    headers["Accept"] = "application/json, text/plain, */*";
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(body);
    const res = await fetch(url, {
      method,
      headers,
      body,
    });
    const response = await res.json();
    return response;
  } catch (error) {
    console.log(error);
    return { success: false, errors: [{ msg: "Couldnt reach server" }] };
  }
};
