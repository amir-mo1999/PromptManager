import { userCredentialsType } from "@/types"
import { AIFunctionInput } from "@/types"

const baseUrlClient = process.env.NEXT_PUBLIC_BASE_API_URL_CLIENT || ""
const baseUrlServer = process.env.NEXT_PUBLIC_BASE_API_URL_SERVER || ""

const createMethod =
  (method: string) =>
  async <T, B = any>(
    route: string,
    body?: FormData | URLSearchParams | any,
    contentType?: "form-data" | "application/json" | "application/x-www-form-urlencoded",
    accessToken?: string
  ) => {
    // set url based on if we are on the server or client
    let url = ""

    if (process.env.IS_SERVER_FLAG === undefined) {
      url = baseUrlClient
    } else {
      url = baseUrlServer
    }
    console.log("URL: ", url)
    // set the default content type to application/json
    if (contentType === undefined) {
      contentType = "application/json"
    }

    // if the content-type is form data do not set the contentType header as browser will handle this automatically
    const headers = new Headers()
    if (contentType !== "form-data") {
      headers.append("Content-Type", contentType)
    }

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
  login: (body: userCredentialsType) => {
    // url encode the body
    const bodyUrlEncoded = new URLSearchParams()
    Object.entries(body).forEach((entry) => bodyUrlEncoded.append(...entry))

    return postRequest("/auth/login", bodyUrlEncoded, "application/x-www-form-urlencoded")
  },

  refreshToken: (accessToken: string) => {
    return getRequest("/auth/refresh-token", undefined, undefined, accessToken)
  },

  getCurrentUser: (accessToken: string) => {
    return getRequest("/auth/get-current-user", undefined, undefined, accessToken)
  },

  getAllProjects: (accessToken: string) => {
    return getRequest("/db/get-all-projects", undefined, undefined, accessToken)
  },

  postAIFunction: (accessToken: string, body: Object) => {
    return postRequest("/db/ai-function", body, "application/json", accessToken)
  },

  postFile: (accessToken: string, file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    return postRequest("/db/upload-file", formData, "form-data", accessToken)
  },
}
