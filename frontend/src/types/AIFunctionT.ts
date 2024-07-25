import { z } from "zod"
import { AIFunctionRouteInput } from "@/models"

type AIFunctionRouteInputT = z.infer<typeof AIFunctionRouteInput>

export type { AIFunctionRouteInputT }
