import * as z from "zod"

const User = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.string(),
  _id: z.string(),
})

type userType = z.infer<typeof User>

export default userType
