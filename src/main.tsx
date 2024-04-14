import { CssBaseline, ThemeProvider } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import ReactDOM from "react-dom/client"
import App from "./App"
import { LIGHTTHEME } from "./styles/MuiTheme"
import "./styles/index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <ThemeProvider theme={LIGHTTHEME}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </LocalizationProvider>,
)
