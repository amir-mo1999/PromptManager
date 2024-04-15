import * as z from "zod"

const Token = z.object({
  access_token: z.string(),
  token_Type: z.string(),
  exp: z.number(),
  iat: z.number(),
  jti: z.string(),
  sub: z.string(),
})

type tokenType = z.infer<typeof Token>

export default tokenType
