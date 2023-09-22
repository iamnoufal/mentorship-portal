import Image from "next/image";
import {
  AppBar,
  Box,
  Grid,
  Toolbar,
  Typography,
  Button,
  Paper,
  TextField,
} from "@mui/material";
import Head from "next/head";
import bgImg from "@/assets/images/image.webp";
import logo from "@/assets/images/bosch_logo.webp";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import "@/styles/Home.module.css";
import { AppContext } from "@/utils/context";
import { signIn, useSession } from "next-auth/react";

export default function IndexPage() {
  const router = useRouter();

  const {data: session} = useSession()

  const { setUser } = useContext(AppContext)
 
  // regno and password are used to store the user's regno and password
  const [regno, setregno] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // error state
  const [error, setError] = useState<string>("");

  // login function is used to set the regno in session storage and redirect the user to the home page
  const handleLogin = () => {
    if (regno == "") {
      setError("Reg No cannot be empty");
    } else if (password == "") {
      setError("Password cannot be empty");
    } else {
      fetch(`/api/user/${regno}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.code == 404) {
            setError(`User with regno ${regno} doesn't exist`)
          } else {
            setUser(data);
            sessionStorage.setItem("regno", regno);
            router.push(sessionStorage.getItem("next") || "/home");
          }
        })
        .catch((err) => {
          setError(err)
        });
    }
  };

  // handle scroll when "Get Started button is clicked"
  const handleScroll = () => {
    window.scrollTo(
      0,
      document.getElementById("login-container")?.offsetTop || 0
    );
  };

  // trigger login function accordingly if enter is presses when filling login cred
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setError("");
    if (event.key == "Enter") {
      event.preventDefault();
      handleLogin();
    }
  };

  // useEffect(() => {
  //   if (window) {
  //     if (sessionStorage.getItem("regno")) {
  //       router.push("/home");
  //     }
  //   }
  // }, []);

  if (session) {
    router.push("/home")
  }

  return (
    <>
      <Head>
        <title>EMT Mentorship Portal</title>
      </Head>
      <Box id="home">
        {/* <AppBar
          position="fixed"
          sx={{
            background: "transparent",
          }}
          elevation={0}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Image
              src={logo}
              style={{ width: "auto", height: "100%" }}
              alt="Bosch Global Software Technologies"
            />
          </Toolbar>
        </AppBar> */}
        <Box
          sx={{
            height: "100vh",
            width: "100%",
            position: "fixed",
            zIndex: -1,
            background: "linear-gradient(to bottom, #FF8FA9, #FFB893)",
          }}
        >
          <Grid container>
            <Grid item xs={12} md={6}></Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  height: "100vh",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  px: 2,
                }}
              >
                <Image
                  src={bgImg}
                  alt="image"
                  style={{ width: "100%", height: "auto" }}
                />
                <Box
                  sx={{ height: 5, background: "black", width: "100%" }}
                ></Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ height: "100vh", width: "100%", zIndex: 1000 }}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  height: "100vh",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "start",
                  px: 4,
                }}
              >
                <Typography variant="h1" fontFamily="Ralwway" color="white" sx={{ textShadow: "5px 3px 7px rgb(204, 84, 108)" }}>
                  Find a mentor
                </Typography>
                <Typography variant="h4" fontFamily="Ralwway" color="white" sx={{ textShadow: "3px 2px 4px rgb(204, 84, 108, 0.7)" }}>
                  Because you can&apos;t learn experience from Google
                </Typography>
                <Button
                  sx={{
                    background:
                      "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                    border: 0,
                    borderRadius: 3,
                    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                    color: "white",
                    px: 3,
                    py: 1,
                    mt: 2,
                  }}
                  variant="contained"
                  onClick={handleScroll}
                >
                  Get Started
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100vh",
                }}
                id="login-container"
              >
                <Paper sx={{ m: 3, background: "#f2f2f2" }}>
                  <div className="brand-border"></div>
                  <Box sx={{ m: 3, p: 2 }}>
                    <Typography variant="h3" textAlign="center" fontFamily="Raleway">
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
                      onClick={() => signIn("google")}
                    >
                      Login
                    </Button>
                  </Box>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}></Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
