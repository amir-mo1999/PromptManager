"use client"
import { MainContentWrapper } from "@/components"
import { Typography, Box, TextField, Button, MenuItem } from "@mui/material"
import { useState, useEffect } from "react"
import { MuiFileInput } from "mui-file-input"
import { AIFunctionInput } from "@/types"

interface inputVariable {
  name: string
  type: string
}

const maxInputVariables = 5
// TODO: Add validation for the form fields
// TODO: send ai function to backend
// TODO: add button to send the form

function validateFunctionName(functionName: string): boolean {
  let valid = true

  // length must be at least one character long
  if (functionName.length < 1) {
    valid = false
  }

  // max 20 characters long
  if (functionName.length > 20) {
    valid = false
  }
  return valid
}

function validateDescription(description: string): boolean {
  let valid = true

  // length must be at least one character long
  if (description.length < 1) {
    valid = false
  }

  // max 20 characters long
  if (description.length > 1000) {
    valid = false
  }
  return valid
}

function validateInputVariableName(inputVariableName: string): boolean {
  let valid = true

  // length must be at least one character long
  if (inputVariableName.length < 1) {
    valid = false
  }

  // max 20 characters long
  if (inputVariableName.length > 20) {
    valid = false
  }
  return valid
}

export default function Home() {
  // function name state
  const [functionName, setFunctionName] = useState<string>("")
  const [functionNameHelpertext, setFunctionNameHelpertext] = useState<string>("")
  const [functionNameError, setFunctionNameError] = useState<boolean>(false)

  // description state
  const [description, setDescription] = useState<string>("")
  const [descriptionHelpertext, setDescriptionHelpertext] = useState<string>("")
  const [descriptionError, setDescriptionError] = useState<boolean>(false)

  // output type state
  const [outputType, setOutputType] = useState<string>("string")

  // this contains a list of the input variables of the ai function
  const [inputVariables, setInputVariables] = useState<inputVariable[]>([
    { name: "", type: "string" },
  ])
  const [inputVariablesHelpertext, setInputVariablesHelpertext] = useState<Array<string>>(
    Array(maxInputVariables).fill([""]).flat()
  )
  const [inputVariablesError, setInputVariablesError] = useState<Array<boolean>>(
    Array(maxInputVariables).fill([false]).flat()
  )

  // variables for the dataset upload
  const [datasetFile, setDatasetFile] = useState<File | null>(null)
  const [dataset, setDataset] = useState<Object>()
  const [datasetSize, setDatasetSize] = useState<number>(0)
  const [datasetAboveMax, setDatasetAboveMax] = useState<boolean>(false)
  const datasetMaxSize = 20000000
  const [datasetError, setDatasetError] = useState<boolean>(false)
  const [datasetHelperText, setDatasetHelperText] = useState<string>("")

  function validateDataset(dataset: object) {
    inputVariables.forEach((inputVariable) => {
      console.log(inputVariable)
    })
    console.log(dataset)
    return true
  }

  // when dataset size changes, check if it exceed max size and set the state to true if yes
  useEffect(() => {
    if (datasetSize > datasetMaxSize) {
      setDatasetAboveMax(true)
      console.log(datasetAboveMax)
    }
  }, [datasetSize])

  // function for adding another input variable
  function addInputVariable() {
    setInputVariables([...inputVariables, { name: "", type: "string" }])
  }

  // function for removing an input variable
  function removeInputVariable(indx: number) {
    const a = inputVariables.filter((item, i) => i !== indx)
    setInputVariables(a)
  }

  // function for changing input variable name
  function changeInputVariableName(name: string, indx: number) {
    const newFields = inputVariables.map((variable, i) =>
      i === indx ? { ...variable, name: name } : variable
    )
    setInputVariables(newFields)
  }

  // function for handling the file upload of the dataset
  const handleFileUploadChange = (file: File | null) => {
    // set the dataset file
    setDatasetFile(file)

    // read the file and set the dataset
    const reader = new FileReader()
    file?.text().then((content) => {
      validateDataset(JSON.parse(content))
      setDataset(JSON.parse(content))
    })
    // set the dataset size
    setDatasetSize(file?.size === undefined ? 0 : file?.size)
  }

  return (
    <MainContentWrapper>
      {/* Wrapper Box for the form */}
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          marginTop: 4,
          height: "80%",
          width: "80%",
        }}
      >
        {/* Wrapper Box for inputting the Metadata*/}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "30%",
          }}
        >
          <Typography>Give the Function a name</Typography>
          <TextField
            id="outlined-basic"
            label="name"
            variant="outlined"
            required={true}
            onChange={(e) => setFunctionName(e.target.value)}
            inputProps={{ maxLength: 20 }}
            helperText={functionNameHelpertext}
            error={functionNameError}
            onBlur={(e) => {
              if (!validateFunctionName(functionName)) {
                setFunctionNameError(true)
                setFunctionNameHelpertext("Please enter a function name")
              } else {
                setFunctionNameError(false)
                setFunctionNameHelpertext("")
              }
            }}
          />
          <Typography>Describe what this Function does</Typography>
          <TextField
            id="outlined-basic"
            label="description"
            variant="outlined"
            required={true}
            multiline={true}
            minRows={5}
            onChange={(e) => setDescription(e.target.value)}
            inputProps={{ maxLength: 1000 }}
            helperText={descriptionHelpertext}
            error={descriptionError}
            onBlur={(e) => {
              if (!validateDescription(description)) {
                setDescriptionError(true)
                setDescriptionHelpertext("Please enter a description")
              } else {
                setDescriptionError(false)
                setDescriptionHelpertext("")
              }
            }}
          />
          <Typography>Define the output type</Typography>
          <TextField
            defaultValue={"string"}
            select={true}
            sx={{ flex: "1" }}
            required={true}
            onChange={(e) => setOutputType(e.target.value)}
          >
            <MenuItem value="int">int</MenuItem>
            <MenuItem value="string">string</MenuItem>
            <MenuItem value="float">float</MenuItem>
          </TextField>
        </Box>
        {/* Wrapper Box for defining the input variables*/}
        <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
          <Typography>Define the input variables of your function</Typography>

          {inputVariables.map((variable, indx) => (
            <Box sx={{ display: "flex", flexDirection: "column", width: "full" }} key={indx}>
              <Typography>Variable {(indx + 1).toString()}</Typography>
              <Box sx={{ display: "flex", flexDirection: "row", width: "full" }}>
                <TextField
                  id="outlined-basic"
                  label="variable name"
                  variant="outlined"
                  required={true}
                  value={variable.name}
                  inputProps={{ maxLength: 20 }}
                  onChange={(event) => {
                    changeInputVariableName(event.target.value, indx)
                  }}
                  error={inputVariablesError[indx]}
                  helperText={inputVariablesHelpertext[indx]}
                  onBlur={() => {
                    if (!validateInputVariableName(inputVariables[indx].name)) {
                      const err = inputVariablesError
                      err[indx] = true
                      setInputVariablesError([...err])

                      const helper = inputVariablesHelpertext
                      helper[indx] = "Please enter a variable name"
                      setInputVariablesHelpertext([...helper])
                    } else {
                      const err = inputVariablesError
                      err[indx] = false
                      setInputVariablesError([...err])

                      const helper = inputVariablesHelpertext
                      helper[indx] = ""
                      setInputVariablesHelpertext([...helper])
                    }
                  }}
                />
                <TextField defaultValue={"string"} select={true} sx={{ flex: "1" }} required={true}>
                  <MenuItem value="int">int</MenuItem>
                  <MenuItem value="string">string</MenuItem>
                  <MenuItem value="float">float</MenuItem>
                </TextField>
                {indx === 0 ? (
                  ""
                ) : (
                  <Button variant="contained" onClick={() => removeInputVariable(indx)}>
                    -
                  </Button>
                )}
              </Box>
            </Box>
          ))}
          <Button
            disabled={inputVariables.length === 5 ? true : false}
            variant="contained"
            sx={{ alignSelf: "center" }}
            onClick={addInputVariable}
          >
            Add variable
          </Button>
        </Box>
        {/* Wrapper Box for uploading the example dataset*/}
        <Box sx={{ width: "30%" }}>
          <Typography>Upload a .json file containing the example dataset</Typography>
          <Typography>Max size: 20mb</Typography>
          <MuiFileInput
            inputProps={{ accept: ".json" }}
            value={datasetFile}
            onChange={(file) => {
              handleFileUploadChange(file)
            }}
            error={datasetError}
            helperText={datasetHelperText}
          />
        </Box>
        <Button
          onClick={() => {
            console.log("\n\n\n")
            console.log("Function Name:", functionName)
            console.log("Description:", description)
            console.log("Output Type:", outputType)
            console.log("Input Variables:", inputVariables)
            console.log("Dataset:", dataset)
          }}
        >
          print values
        </Button>
      </Box>
      <Button variant="contained" onClick={() => {}}>
        Create AI Function
      </Button>
    </MainContentWrapper>
  )
}
