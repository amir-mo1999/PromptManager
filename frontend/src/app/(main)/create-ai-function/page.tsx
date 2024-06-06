"use client"
import { MainContentWrapper } from "@/components"
import { Typography, Box, TextField, Button, MenuItem } from "@mui/material"
import { useState } from "react"

interface inputVariable {
  name: string
  type: string
}

export default function Home() {
  // this contains a list of the input variables of the ai function
  const [inputVariables, setInputVariables] = useState<inputVariable[]>([
    { name: "", type: "string" },
  ])

  // function for adding another input variable
  function addInputVariable() {
    setInputVariables([...inputVariables, { name: "", type: "string" }])
  }
  function removeInputVariable(indx: number) {
    const a = inputVariables.filter((item, i) => i !== indx)
    setInputVariables(a)
  }

  function changeInputVariableName(name: string, indx: number) {
    const newFields = inputVariables.map((variable, i) =>
      i === indx ? { ...variable, name: name } : variable
    )
    setInputVariables(newFields)
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
          <TextField id="outlined-basic" label="name" variant="outlined" required={true} />
          <Typography>Describe what this Function does</Typography>
          <TextField
            id="outlined-basic"
            label="description"
            variant="outlined"
            required={true}
            multiline={true}
            minRows={5}
            sx={{ flex: 1 }}
          />
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
        <Box sx={{ width: "30%" }}>Example dataset</Box>
      </Box>
    </MainContentWrapper>
  )
}
