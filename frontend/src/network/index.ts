import { network } from "./utils"
import userCredentials from "@/types/userCredentials"

const baseUrlClient = process.env.NEXT_PUBLIC_BASE_API_URL_CLIENT || ""
const baseUrlServer = process.env.NEXT_PUBLIC_BASE_API_URL_SERVER || ""

const createMethod =
  (method: string) =>
  async <T, B = any>(
    route: string,
    body?: FormData | URLSearchParams,
    contentType?: string,
    accessToken?: string
  ) => {
    // set url based on if we are on the server or client
    let url = ""
    if (process.env.IS_SERVER_FLAG === undefined) {
      url = baseUrlClient
    } else {
      url = baseUrlServer
    }

    // set default content type to json
    contentType = contentType || "application/json"

    // create headers
    const headers = new Headers({ "Content-Type": contentType })

    // add token to headers
    if (accessToken) {
      headers.append("Authorization", "Bearer " + accessToken)
    }

    // send request and return response
    return await fetch(url + route, {
      method: method,
      body: contentType === "application/json" ? JSON.stringify(body) : body,
      headers: headers,
      credentials: "include",
      mode: "cors",
    })
  }

const postRequest = createMethod("POST")
const deleteRequest = createMethod("DELETE")
const getRequest = createMethod("GET")
const patchRequest = createMethod("PATCH")

export const api = {
  login: (body: userCredentials) => {
    // url encode the body
    const bodyUrlEncoded = new URLSearchParams()
    Object.entries(body).forEach((entry) => bodyUrlEncoded.append(...entry))

    return postRequest("/auth/login", bodyUrlEncoded, "application/x-www-form-urlencoded")
  },

  refreshToken: (accessToken: string) => {
    return getRequest("/auth/refresh-token", undefined, undefined, accessToken)
  },
}
