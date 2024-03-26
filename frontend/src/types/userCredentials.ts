import * as z from "zod"

const userCredentialsObj = z.object({
  username: z.string() || z.undefined,
  password: z.string() || z.undefined,
})

type userCredentials = z.infer<typeof userCredentialsObj>

export default userCredentials
