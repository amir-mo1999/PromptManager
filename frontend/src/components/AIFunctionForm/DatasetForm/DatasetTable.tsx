import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

interface DatasetTableProps {
  dataset: Array<Record<string, string | number>>
}

const DatasetTable: React.FC<DatasetTableProps> = ({ dataset }) => {
  if (dataset.length === 0) {
    return ""
  }
  // get table headers
  const headers = Object.keys(dataset[0])
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header, indx) => {
              return (
                <TableCell align="left" key={indx}>
                  {header}
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataset.map((record, indx) => {
            return (
              <TableRow key={indx}>
                {headers.map((header, indx) => {
                  return (
                    <TableCell
                      component="div"
                      key={indx}
                      sx={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        maxHeight: 50,
                        maxWidth: 200,
                      }}
                      align="left"
                    >
                      {record[header]}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export { DatasetTable }
