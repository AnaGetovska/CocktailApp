import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavouritesProvider } from "./context/FavouritesProvider.tsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ThemeOptions } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const queryClient = new QueryClient();

const themeOptions: ThemeOptions = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffd180",
      dark: "#201c1c",
    },
    secondary: {
      main: "#f4ff81",
    },
    background: {
      default: "#000000",
      paper: "#060303",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <FavouritesProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={themeOptions}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </FavouritesProvider>
);
