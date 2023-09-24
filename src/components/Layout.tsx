import { useContext, useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import Link from "next/link";
import { AppContext } from "@/utils/context";
import Loader from "./Loader";
import { useRouter } from "next/router";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "@/assets/images/bosch_logo.webp";
import Image from "next/image";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Alert from "./Alert";
import bgImg from "@/assets/images/image-bg.webp";
import Head from "next/head";
import { signOut, useSession } from "next-auth/react";

/**
 *
 * @param children React.ReactNode - The content to be displayed in the layout
 * @param title string - The title to be displayed in the browser tab
 * @returns React.Component - A layout with the content passed in
 * @example
 * <Layout title="Home Page">
 *   <div>Hello World</div>
 * </Layout>
 * @see
 * Drawer - https://mui.com/components/drawers
 *
 * AppBar - https://mui.com/components/app-bar
 *
 * Toolbar - https://mui.com/components/toolbars/
 */
function Layout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const router = useRouter();

  const {data: session} = useSession()

  const { user, setUser, setLoading, theme, setTheme } = useContext(AppContext);
  
  useEffect(() => {
    if (!session) {
      if (router) {
        router.push("/");
      }
    }
  })

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  // useEffect(() => {
  //   if (window) {
  //     if (!sessionStorage.getItem("regno")) {
  //       sessionStorage.setItem("next", router.asPath);
  //       router.push("/");
  //     }
  //   }
  // });

  useEffect(() => {
    fetch(`/api/user/${session?.user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.code != 404) {
          setUser(data);
          setLoading(false);
          sessionStorage.removeItem("next");
        }
      })
      .catch((err) => {
        sessionStorage.removeItem("email");
        sessionStorage.setItem("next", router.asPath);
        router.push("/");
      });
  }, [router, setUser, setLoading]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const value = localStorage.getItem("theme") as string as "light" | "dark";
      if (value != null) setTheme(value);
    }
  }, [setTheme]); 

  const handleThemeChange = () => {
    let value: "light" | "dark" = theme == "light" ? "dark" : "light";
    setTheme(value);
    localStorage.setItem("theme", value);
  };

  const logout = () => {
    sessionStorage.removeItem("email");
    router.push("/");
  };

  const generalLinks = [
    {
      label: "Home",
      to: "/home",
    },
    {
      label: "Mentor",
      to: "/mentor",
    },
    // {
    //   label: "Feedbacks",
    //   to: "/feedback",
    // },
  ];

  const mentorLinks = [
    {
      label: "My Mentees",
      to: "/mentees",
    },
  ];

  const adminLinks = [
    {
      label: "Students",
      to: "/students",
    },
    // {
    //   label: "All Feedbacks",
    //   to: "/forms",
    // },
  ];

  const drawerWidth = 240;

  const drawer = (
    <Stack justifyContent="space-between" sx={{ height: "100%" }}>
      <List>
        {generalLinks.map((item) => (
          <Link
            href={item.to}
            key={item.to}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <ListItem disablePadding>
              <ListItemButton
                selected={router.asPath.split("/")[1] == item.to.split("/")[1]}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
        {(user.type === "mentor" || user.type === "admin") &&
          mentorLinks.map((item) => (
            <Link
              href={item.to}
              key={item.to}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <ListItem disablePadding>
                <ListItemButton
                  selected={
                    router.asPath.split("/")[1] == item.to.split("/")[1]
                  }
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        {user.type === "admin" &&
          adminLinks.map((item) => (
            <Link
              href={item.to}
              key={item.to}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <ListItem disablePadding>
                <ListItemButton
                  selected={
                    router.asPath.split("/")[1] == item.to.split("/")[1]
                  }
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        <Link
          href="/about"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <ListItem disablePadding>
            <ListItemButton selected={router.asPath.split("/")[1] == "about"}>
              <ListItemText primary="About" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Stack direction="row" justifyContent={"space-evenly"} sx={{ my: 3 }}>
        <IconButton onClick={() => router.push("/profile")}>
          {user.image ? (
            <Avatar
              src={user.image}
              alt={user.name}
              sx={{ height: 30, width: 30 }}
            />
          ) : (
            <AccountCircleIcon />
          )}
        </IconButton>
        <IconButton onClick={handleThemeChange}>
          {theme === "light" ? <DarkModeIcon /> : <WbSunnyRoundedIcon />}
        </IconButton>
        <IconButton onClick={() => signOut()}>
          <LogoutRoundedIcon />
        </IconButton>
        <IconButton onClick={() => setIsHelpOpen(true)}>
          <HelpRoundedIcon />
        </IconButton>
      </Stack>
    </Stack>
  );

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Loader>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            {/* <AppBar
              position="fixed"
              sx={{
                width: { md: `calc(100% - ${drawerWidth}px)` },
                ml: { md: `${drawerWidth}px` },
                display: { md: "none" },
                py: 1,
                background:
                  theme == "light"
                    ? "linear-gradient(to bottom, #ffffff, #f2f2f2)"
                    : "",
              }}
              elevation={trigger ? 4 : 0}
            >
              <Toolbar sx={{ justifyContent: "space-between" }}>
                <Image
                  src={logo}
                  style={{ width: "auto", height: "100%" }}
                  alt="Bosch Global Software Technologies"
                />
                <IconButton
                  edge="start"
                  onClick={() => setOpenDrawer(!openDrawer)}
                  sx={{ mr: 2, display: { md: "none" } }}
                >
                  <MenuIcon />
                </IconButton>
              </Toolbar>
            </AppBar> */}
            <Box
              component="nav"
              sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
            >
              <Drawer
                variant="temporary"
                open={openDrawer}
                onClose={() => setOpenDrawer(!openDrawer)}
                ModalProps={{
                  keepMounted: true,
                }}
                sx={{
                  display: { xs: "block", md: "none" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                  },
                }}
              >
                {/* <Box sx={{ p: 3 }}>
                  <Image
                    src={logo}
                    style={{ width: "100%", height: "auto" }}
                    alt="Bosch Global Software Technologies"
                  />
                </Box>
                <Divider /> */}
                {drawer}
              </Drawer>
              <Drawer
                variant="permanent"
                sx={{
                  display: { xs: "none", md: "block" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                  },
                }}
                open
              >
                {/* <Box sx={{ p: 3 }}>
                  <Image
                    src={logo}
                    style={{ width: "100%", height: "auto" }}
                    alt="Bosch Global Software Technologies"
                  />
                </Box>
                <Divider /> */}
                {drawer}
              </Drawer>
            </Box>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                width: { md: `calc(100% - ${drawerWidth}px)` },
              }}
            >
              <Toolbar sx={{ display: { md: "none" }, my: 1 }} />
              <Box sx={{ p: 3 }}>{children}</Box>
              {/* <Image
                src={bgImg}
                alt="background image"
                style={{
                  position: "fixed",
                  bottom: 0,
                  zIndex: -1,
                  right: 0,
                  width: "70%",
                  height: "auto",
                  opacity: 0.4,
                }}
              /> */}
            </Box>
          </Box>
          <div
            className="brand-border"
            style={{
              position: "fixed",
              zIndex: 1000000,
              bottom: 0,
              width: "100%",
            }}
          ></div>
          <Alert
            open={isHelpOpen}
            next={() => setIsHelpOpen(false)}
            title="For support, please reach out to"
          >
            <List>
              <Link
                href="mailto:noufal@gct.ac.in?subject=Support%20for%20mentorship%20portal%20reg"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <ListItemButton disableGutters>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Noufal Rahman" />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Noufal Rahman"
                      secondary="noufal@gct.ac.in"
                    />
                  </ListItem>
                </ListItemButton>
              </Link>
            </List>
          </Alert>
        </LocalizationProvider>
      </Loader>
    </>
  );
}

export default Layout;
