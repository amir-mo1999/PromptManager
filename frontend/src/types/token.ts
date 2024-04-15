import * as z from "zod"

const token = z.object({
  access_token: z.string(),
  token_Type: z.string(),
  exp: z.number(),
  iat: z.number(),
  jti: z.string(),
})

type token = z.infer<typeof token>

export default token
