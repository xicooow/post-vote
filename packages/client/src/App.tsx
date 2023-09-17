import {
  Container,
  createTheme,
  CssBaseline,
  useMediaQuery,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material";
import { useMemo } from "react";

import { Posts } from "./components/Posts";
import { AddPost } from "./components/AddPost";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      responsiveFontSizes(
        createTheme({
          palette: {
            mode: prefersDarkMode ? "dark" : "light",
          },
        })
      ),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container fixed>
        <Posts />
        <AddPost />
      </Container>
    </ThemeProvider>
  );
}

export default App;
