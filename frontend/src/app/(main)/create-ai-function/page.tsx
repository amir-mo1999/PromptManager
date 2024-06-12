"use client"
import { MainContentWrapper } from "@/components"
import { Typography, Box, TextField, Button, MenuItem } from "@mui/material"
import { useState, useEffect } from "react"
import { MuiFileInput } from "mui-file-input"

interface inputVariable {
  name: string
  type: string
}

export default function Home() {
  // function name state
  const [functionName, setFunctionName] = useState<string>("")

  // description state
  const [description, setDescription] = useState<string>("")

  // output type state
  const [outputType, setOutputType] = useState<string>("string")

  // this contains a list of the input variables of the ai function
  const [inputVariables, setInputVariables] = useState<inputVariable[]>([
    { name: "", type: "string" },
  ])

  // variables for the dataset upload
  const [datasetFile, setDatasetFile] = useState<File | null>(null)
  const [dataset, setDataset] = useState<Object>()
  const [datasetSize, setDatasetSize] = useState<number>(0)
  const [datasetAboveMax, setDatasetAboveMax] = useState<boolean>(false)
  const datasetMaxSize = 20000000

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
    file?.text().then((content) => setDataset(JSON.parse(content)))

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
                  onChange={(event) => {
                    changeInputVariableName(event.target.value, indx)
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
          <Button variant="contained" sx={{ alignSelf: "center" }} onClick={addInputVariable}>
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
            onChange={handleFileUploadChange}
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
    </MainContentWrapper>
  )
}
