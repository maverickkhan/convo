import { ThemeOptions, createTheme } from "@mui/material"
import type {} from "@mui/x-data-grid/themeAugmentation"
import type {} from "@mui/x-date-pickers/themeAugmentation"
import merge from "deepmerge"
import {
  amber,
  black,
  blue,
  current,
  cyan,
  emerald,
  fuchsia,
  gray,
  green,
  indigo,
  inherit,
  lime,
  neutral,
  orange,
  pink,
  purple,
  red,
  rose,
  sky,
  slate,
  stone,
  teal,
  transparent,
  violet,
  white,
  yellow,
  zinc,
} from "tailwindcss/colors"

export const themeColor = merge(
  {
    slate,
    gray,
    zinc,
    neutral,
    stone,
    red,
    orange,
    amber,
    yellow,
    lime,
    green,
    emerald,
    teal,
    cyan,
    sky,
    blue,
    indigo,
    violet,
    purple,
    fuchsia,
    pink,
    rose,
    inherit,
    current,
    transparent,
    black,
    white,
  },
  {
    primary: {
      light: "#00AB35",
      main: "#006E22",
      dark: "#004F19",
      50: "#00F84D",
      100: "#00E848",
      200: "#00CA3E",
      300: "#00AB35",
      400: "#008D2B",
      500: "#006E22",
      600: "#005F1D",
      700: "#004F19",
      800: "#004014",
      900: "#00310F",
      // 950: "#00290D",
    },

    info: {
      main: "#0288d1",
      contrastText: "#fff",
    },
    success: {
      main: "#00c171",
      contrastText: "#fff",
    },

    muted: neutral[500],
  },
)

export const LIGHT: ThemeOptions = {
  palette: {
    ...themeColor,
    grey: themeColor.neutral,
    common: {
      black: themeColor.black,
      white: themeColor.white,
    },
    background: {
      default: themeColor.white,
      paper: themeColor.white,
    },
  },
  typography: {
    fontSize: 14,
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root,body": {
          background: themeColor.gray[100],
          color: themeColor.black,
          "& *, ::before, ::after": {
            borderColor: themeColor.gray[200],
          },
        },
      },
    },

    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          minWidth: "unset",
          textTransform: "inherit",
        },
      },
    },

    MuiDataGrid: {
      styleOverrides: {
        columnHeaderTitle: {
          fontWeight: "bold",
          fontSize: "1rem",
        },
        cell: {
          display: "flex",
          alignItems: "center",
          padding: ".5rem",
        },
        root: {
          ".MuiDataGrid-editInputCell": {
            width: "100%",

            "& > .MuiInputBase-root, .MuiInputBase-input": {
              width: "100%",
              borderRadius: "4px",
              backgroundColor: themeColor.white,
              border: "1px solid",
              borderColor: themeColor.neutral[300],
              cursor: "default",
              minHeight: "38px",
              outline: "0 !important",
              transition: "all 100ms",
            },
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: ".5rem",
          borderWidth: "2px",
          padding: "1rem",
          "& .MuiDataGrid-root": {
            marginTop: "-.75rem",
            marginBottom: "-.75rem",
          },
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          "&.MuiInputBase-readOnly,& .MuiInputBase-readOnly": {
            paddingLeft: 0,
            pointerEvents: "none !important",

            "& ~ fieldset": {
              border: 0,
            },
            "& textarea": {
              resize: "none",
            },
            "& ~ svg[data-testid]": {
              display: "none",
            },
          },
        },
        multiline: {
          "& textarea": {
            resize: "vertical",
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          minWidth: "193px",
          "& .MuiFilledInput-root": {
            backgroundColor: "#f3f6f9",
            borderWidth: "1px",
            borderRadius: "2rem",

            "&.Mui-focused:after": { opacity: 1 },
            "& fieldset": { border: 0 },
            "&::before,&::after": { content: "none" },
          },
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          padding: "1.5rem",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: { paddingTop: 0, paddingRight: 0, paddingLeft: 0 },
      },
    },

    MuiDialogContent: {
      styleOverrides: {
        root: { paddingLeft: 0, paddingRight: 0 },
      },
    },

    MuiDialogActions: {
      styleOverrides: {
        root: { paddingBottom: 0, paddingRight: 0, paddingLeft: 0 },
      },
    },
  },
}

export const LIGHTTHEME = createTheme(LIGHT)
