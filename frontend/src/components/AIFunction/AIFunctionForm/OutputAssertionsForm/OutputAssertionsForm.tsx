import { useState } from "react"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import IconButton from "@mui/material/IconButton"
import EditIcon from "@mui/icons-material/Edit"
import RemoveIcon from "@mui/icons-material/Remove"

interface OutputAssertionsFormProps {}

const OutputAssertionsForm: React.FC<OutputAssertionsFormProps> = ({}) => {
  const onEdit = (indx: number) => {
    const f = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {}
    return f
  }

  const onDelete = (indx: number) => {
    const f = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {}
    return f
  }

  return (
    <List sx={{ width: "100%", maxHeight: "20%", overflow: "auto" }}>
      {[0, 1, 2, 3, 4, 5, 6].map((value, indx) => {
        const labelId = `checkbox-list-label-${indx}`

        return (
          <ListItem
            key={indx}
            secondaryAction={
              <>
                <IconButton color="primary" onClick={onEdit(indx)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="primary" onClick={onDelete(indx)}>
                  <RemoveIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText id={labelId} primary={`Line item ${indx + 1}`} />
          </ListItem>
        )
      })}
    </List>
  )
}

export { OutputAssertionsForm }
