"use client"
import { useSession } from "next-auth/react"
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material"

import { signOut } from "next-auth/react"

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein }
}

const columns = [
  { id: "title", label: "Title", maxWidth: 75 },
  { id: "description", label: "Description", maxWidth: 200 },
  { id: "functions", label: "Functions", maxWidth: 30 },
  { id: "createdOn", label: "Created on", maxWidth: 40 },
]

const rows = [
  {
    title: "Project #1",
    description:
      "Some dumb projecmhdmhdt,kztedkzetkztd,mztdkzudl,udludkuedkzdtkzmdtkzcgmhnmbn mhztkjzsstgewhrehgremkhlrem hkroe hkmreö hjrwke nhjrwekh jrewkhn tjwehn tnjwkh tjwkntjwh tjwrktjwhkwrjt pwjhopt whkot wkho",
    functions: "5",
    createdOn: "14/04/2024",
  },
  {
    title: "Project #2",
    description: "Some dumb project",
    functions: "12",
    createdOn: "17/04/2024",
  },
  {
    title: "Project #3",
    description: "Some dumb project",
    functions: "18",
    createdOn: "12/04/2024",
  },
  {
    title: "Project #4",
    description: "Some dumb project",
    functions: "20",
    createdOn: "13/04/2024",
  },
  {
    title: "Project #5",
    description: "Some dumb project",
    functions: "1",
    createdOn: "24/04/2024",
  },
  {
    title: "Project #6gewgewgewgewgegewgherwgewgfewqgewgewgewghewgewgewgewgewgsaesegaw",
    description: "Some dumb project",
    functions: "3",
    createdOn: "1/04/2024",
  },
  { title: "Project #7", description: "Some dumb project", functions: "0", createdOn: "2/04/2024" },
  { title: "Project #8", description: "Some dumb project", functions: "4", createdOn: "5/04/2024" },
]
export default function Home() {
  const { data: session } = useSession()

  if (session?.user.role === undefined) {
    // TODO: replace with a custom loading component
    return <main>Loading ...</main>
  } else if (session?.user.role === "developer") {
    return (
      <Box
        sx={{
          height: "80%", // Set height to 50% of the viewport height
          width: "80%", // Set width to 50% of the viewport width
        }}
        display="flex"
        flexDirection="column"
        gap={2}
        p={2}
      >
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h3">Projects</Typography>
          <Button variant="contained" onClick={() => signOut()}>
            Sign Out
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} style={{ maxWidth: column.maxWidth }}>
                    <Typography>{column.label}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.title} onClick={() => console.log("clicked")} hover={true}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{ maxWidth: column.maxWidth, overflowWrap: "break-word" }}
                    >
                      <Typography>
                        {
                          // @ts-ignore
                          row[column.id]
                        }
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    )
  }

  // TODO: replace with a custom not authorized component
  return <main>You are not authorized to view this page!</main>
}
