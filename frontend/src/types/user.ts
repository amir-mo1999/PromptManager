import * as z from "zod"

const user = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.string(),
  _id: z.string(),
})

type user = z.infer<typeof user>

export default user
