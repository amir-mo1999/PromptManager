import { useState, useEffect } from "react"
import { AIFunctionT } from "@/types"
const useAIFunctions = () => {
  const [AIFunctions, setAIFunctions] = useState<Array<AIFunctionT>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/project")
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const data = await response.json()
        setProjects(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return { AIFunctions }
}

export { useAIFunctions }
