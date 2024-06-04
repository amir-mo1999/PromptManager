import * as z from "zod"

const decodedToken = z.object({
  exp: z.number(),
  iat: z.number(),
  jti: z.string(),
  sub: z.string(),
})

type decodedToken = z.infer<typeof decodedToken>

export type { decodedToken }
