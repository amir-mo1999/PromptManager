import { z } from "zod"

// Define the schema using zod
const project = z.object({
  title: z.string(),
  description: z.string(),
  username: z.string().email(),
  number_of_functions: z.number().int().nonnegative(),
  creation_time: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  _id: z.string(),
})

type project = z.infer<typeof project>

export type { project }
