import environment from "../utils/enviroment";

type PropsCallApi = {
  url: string;
  method: "POST" | "PATCH" | "GET" | "DELETE";
  token?: string;
  body?: any;
  apiName: string;
  baseUrl?: string;
};

export const callApi = ({
  url,
  method,
  token,
  body,
  apiName,
  baseUrl = environment.API_URL
}: PropsCallApi) => {
  if (__DEV__) {
    console.log(`URL-${method}`, `${baseUrl}${url}`);
    console.log("token", token);
    console.log(`Call Api${apiName}`, body);
    console.log(`Call Api${apiName}`, JSON.stringify(body));
  }

  return fetch(`${baseUrl}${url}`, {
    method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(body)
  }).then(async response => {
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
