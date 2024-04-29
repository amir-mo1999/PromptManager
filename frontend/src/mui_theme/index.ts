// https://mui.com/material-ui/customization/theming/
import { ThemeOptions, createTheme } from "@mui/material/styles"
import "@fontsource/roboto/300.css"

// below is an example for adding additional parameters (here status.danger) to the theme
declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string
    }
  }
}

// create custom theme
// TODO: create an actual theme; this is just a placeholder
export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
}
const theme = createTheme(themeOptions)

export default theme
