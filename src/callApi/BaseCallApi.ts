import environment from "../utils/enviroment";

type PropsCallApi = {
  url: string;
  method: "POST" | "PATCH" | "GET" | "DELETE";
  token?: string;
  body?: any;
  apiName: string;
  baseUrl?: "gotumi" | "youtube";
};

export const callApi = ({
  url,
  method,
  token,
  body,
  apiName,
  baseUrl
}: PropsCallApi) => {
  let base = "";
  switch (baseUrl) {
    case "gotumi":
      base = environment.API_URL;
      break;
    case "youtube":
      base = environment.API_URL_YOUTUBE;
      break;

    default:
      base = environment.API_URL;
      break;
  }
  if (__DEV__) {
    console.log(`URL-${method}`, `${base}${url}`);
    console.log("token", token);
    console.log(`Call Api${apiName}`, body);
    console.log(`Call Api${apiName}`, JSON.stringify(body));
  }

  const headers = token
    ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    : {
        "Content-Type": "application/json"
      };

  return fetch(`${base}${url}`, {
    method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers,
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(body)
  }).then(async response => {
    console.log("responseJson", response);
    // if (!response.ok && __DEV__) {
    //   const html = await response.text().catch(e => e);
    //   console.log("responseErrorFetch", html);
    // }
    return response.json();
  });
};

export default callApi;

function timeout(ms: number, promise: any) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error("timeout"));
    }, ms);
    promise.then(resolve, reject);
  });
}
