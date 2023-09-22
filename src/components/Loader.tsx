import { AppContext } from "@/utils/context";
import { darkTheme, lightTheme } from "@/utils/theme";
import { Box, CircularProgress, ThemeProvider } from "@mui/material";
import { useContext } from "react";

/**
 * Loader component displays a loader when the app is loading. Otherwise, it displays the children passed in. 
 * @param children React.ReactNode - The children to be displayed
 * @returns React.Component - A loader component
 * @example
 * <Loader>
 *  <div>Hello World</div>
 * </Loader>
 */
function Loader({ children }: { children: React.ReactNode }) {
  const { loading, theme } = useContext(AppContext);
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        children
      )}
    </ThemeProvider>
  );
}

export default Loader;