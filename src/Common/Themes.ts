import { blue } from "@mui/material/colors";
import createTheme from "@mui/material/styles/createTheme";

export const createMainTheme = () => createTheme({
  palette: {
    primary: {
      main: blue[900],
    },
    secondary: {
      main: blue[500]
    }
  },
});