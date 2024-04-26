import * as z from "zod"

const userCredentialsObj = z.object({
  username: z.string() || z.undefined,
  password: z.string() || z.undefined,
})

type userCredentialsType = z.infer<typeof userCredentialsObj>

export type { userCredentialsType }
