import { network } from "./utils"
import userCredentials from "@/types/userCredentials"

const baseUrlClient = process.env.NEXT_PUBLIC_BASE_API_URL_CLIENT || ""
const baseUrlServer = process.env.NEXT_PUBLIC_BASE_API_URL_SERVER || ""

const fetchCors = (route: string, init?: RequestInit | undefined) => {
  /**
   * Wrapper function for making cross-origin fetch requests with custom options.
   * It simplifies the process of making fetch requests with specific configurations.
   * @param {RequestInfo | URL} url - The URL to which the fetch request will be made.
   * @param {RequestInit | undefined} [init] - Optional initialization options for the fetch request.
   * @returns {Promise<Response>} - A Promise that resolves to the Response to the fetch request.
   */

  let url = ""
  if (process.env.IS_SERVER_FLAG === undefined) {
    url = baseUrlClient
  } else {
    url = baseUrlServer
  }
  console.log(url)
  return fetch(url + route, {
    ...init,
    credentials: "include",
    mode: "cors",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
}

const createMethod =
  (method: string) =>
  async <T, B = any>(
    route: string,
    init?:
      | (Omit<RequestInit, "body"> & { body: T } & {
          throwError: boolean
        })
      | undefined
  ) => {
    const response = await fetchCors(route, {
      ...init,
      ...(init && init.body ? { body: JSON.stringify(init.body) } : { body: null }),
      method,
    })
    network.checkResponse(response, init?.throwError)

    return response.json() as Promise<B>
  }

const postRequest = createMethod("POST")
const deleteRequest = createMethod("DELETE")
const getRequest = createMethod("GET")
const patchRequest = createMethod("PATCH")

export const api = {
  login: (body: userCredentials) =>
    postRequest<userCredentials>("/auth/login", { body, throwError: true }),
}
