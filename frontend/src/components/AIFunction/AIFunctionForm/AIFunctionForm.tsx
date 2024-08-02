"use client"
import * as React from "react"
import { MainContentWrapper } from "@/components"
import { DatasetForm } from "./DatasetForm"
import { InputVariableForm } from "./InputVariableForm"
import { OutputAssertionsForm } from "./OutputAssertionsForm"
import { OutputConstraintsT } from "@/types"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import { InputVariableT } from "@/types"
import { api } from "@/network"
import { useSession } from "next-auth/react"
import { AIFunctionOutputTypeT } from "@/types"
import { StringInputConstraints } from "@/models"

//TODO: add validation for the function name so there is no doubles

interface AIFunctionFormProps {}

const AIFunctionForm: React.FC<AIFunctionFormProps> = () => {
  // get router
  const router = useRouter()

  // get current session
  const { data: session } = useSession()

  // function Name stuff
  const [functionName, setFunctionName] = useState<string>("")
  const [functionNameError, setFunctionNameError] = useState<boolean>(false)
  const [functionNameHelperText, setFunctionNameHelperText] = useState<boolean>(false)
  const onFunctionNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFunctionName(e.target.value)
  }

  // description stuff
  const [description, setDescription] = useState<string>("")
  const [descriptionError, setDescriptionError] = useState<boolean>(false)
  const [descriptionHelperText, setDescriptionHelperText] = useState<boolean>(false)
  const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }
  // state for input variables
  const [inputVariables, setInputVariables] = useState<InputVariableT[]>([])

  // state for output type
  const [outputType, setOutputType] = useState<AIFunctionOutputTypeT>("string")
  const [outputConstraints, setOutputConstraints] = useState<OutputConstraintsT>(
    StringInputConstraints.parse({})
  )

  // set dataset state
  const [dataset, setDataset] = useState<Array<Record<string, string | number>>>([])

  function handleSubmit() {
    // assemble the request body
    let body = {
      name: functionName,
      description: description,
      input_variables: inputVariables,
      output_type: outputType,
      output_constraints: outputConstraints,
      example_dataset: dataset,
    }

    // send the request
    api
      .postAIFunction(session?.user.access_token as string, body)
      .then((response) => {
        return response.json()
      })
      .then((data) => data)
    // redirect user to main page
    router.push("/")
  }

  // reset the dataset when the input variables change
  useEffect(() => setDataset([]), [inputVariables])

  return (
    <MainContentWrapper>
      <Typography>AI Function Name</Typography>
      <TextField
        value={functionName}
        error={functionNameError}
        helperText={functionNameHelperText}
        required={true}
        onChange={onFunctionNameChange}
      ></TextField>

      <Typography>Description</Typography>
      <TextField
        multiline
        value={description}
        error={descriptionError}
        helperText={descriptionHelperText}
        required={true}
        onChange={onDescriptionChange}
        minRows={10}
        maxRows={10}
      ></TextField>

      <Typography sx={{ alignSelf: "left" }}>Input Variables</Typography>
      <InputVariableForm
        setInputVariables={setInputVariables}
        inputVariables={inputVariables}
      ></InputVariableForm>

      <Typography>Output Assertions</Typography>
      <OutputAssertionsForm></OutputAssertionsForm>
    </MainContentWrapper>
  )
}

export { AIFunctionForm }
