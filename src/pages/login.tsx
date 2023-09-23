import Head from "next/head";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function LoginPage() {
  // regno and password are used to store the user's regno and password
  const [regno, setregno] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // error state
  const [error, setError] = useState<string>("");

  // router is used to redirect the user to the home page after logging in
  const router = useRouter();

  // redirect the user to home page if the regno exists in session
  useEffect(() => {
    if (window) {
      if (sessionStorage.getItem("regno")) {
        router.push("/home");
      }
    }
  });

  // login function is used to set the regno in session storage and redirect the user to the home page
  const login = () => {
    if (regno == "") {
      setError("Reg No cannot be empty");
    } else if (password == "") {
      setError("Password cannot be empty");
    } else {
      fetch(`/api/user/${regno}`)
    }
  };

  // trigger login function accordingly if enter is presses when filling login cred
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setError("");
    event.preventDefault();
    login();
  };

  return (
    <>
      <Head>
        <title>Login | Mentorship</title>
      </Head>
      <Box
        sx={{
          // background: `linear-gradient( 200deg, #8a1924 10%, #d03d51 20%, #3b4899 35%, #1a64a9 45%, #02acca 60%, #02a46c 91% )`,
          background: "linear-gradient(to bottom, #FF8FA9, #FFB893)"
        }}
      >
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box></Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
              }}
            >
              <Paper sx={{ m: 3 }}>
                <div className="brand-border"></div>
                <Box sx={{ m: 3, p: 2 }}>
                  <Typography variant="h3" textAlign="center">
                    Mentorship Portal
                  </Typography>
                  <Box sx={{ mt: 5, mb: 3 }}>
                    <Box sx={{ mb: 3 }}>
                      <TextField
                        label="Reg No"
                        value={regno}
                        sx={{ width: "100%" }}
                        onChange={(e) => setregno(e.currentTarget.value)}
                        onKeyDownCapture={handleKeyPress}
                      />
                    </Box>
                    <Box>
                      <TextField
                        label="Password"
                        value={password}
                        type="password"
                        sx={{ width: "100%" }}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                        onKeyDownCapture={handleKeyPress}
                      />
                    </Box>
                  </Box>
                  <Typography color="error" sx={{ mb: 2, mt: 0 }}>
                    {error}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      background:
                        "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                      border: 0,
                      borderRadius: 3,
                      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                      color: "white",
                      px: 3,
                      py: 1,
                      width: "100%",
                    }}
                    onClick={login}
                  >
                    Login
                  </Button>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default LoginPage;
