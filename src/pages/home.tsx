import { Fragment, useContext } from "react";
import Layout from "@/components/Layout";
import { AppContext } from "@/utils/context";
import { Box, Button, Card, Grid, Paper, Typography } from "@mui/material";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import Link from "next/link";

function HomePage() {

  // fetch user data from context
  const { user } = useContext(AppContext);
  
  return (
    <Layout title="EMT Mentorship Portal">
      <Box>
        <Typography variant="button">Welcome</Typography>
        <Typography variant="h4">{user.name}</Typography>
      </Box>
      <Grid container sx={{ my: 2 }} spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: "100%", position: "relative" }}>
            <Typography variant="button">glance</Typography>
            <Box sx={{ my: 2 }}>
              <Typography variant="caption">Reg No</Typography>
              <Typography variant="body2">{user.regno}</Typography>
            </Box>
            <Box sx={{ my: 2 }}>
              <Typography variant="caption">Department</Typography>
              <Typography variant="body2">{user.department}</Typography>
            </Box>
            <Box sx={{ my: 2 }}>
              <Typography variant="caption">Year</Typography>
              <Typography variant="body2">{user.year}</Typography>
            </Box>
            <Box sx={{ position: "absolute", right: 0, bottom: 0, m: 1 }}>
              <Link href="/profile">
                <Button size="small">View More</Button>
              </Link>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: "100%", position: "relative" }}>
            <Typography variant="button">Assigned feedbacks</Typography>
            {user.assignedFeedbacks?.filter((f) => f.submitted == 0).length ===
            0 ? (
              <Typography variant="body1" sx={{ my: 2 }}>
                No feedbacks assigned to you
              </Typography>
            ) : (
              <Box sx={{ mt: 2 }}>
                {user.assignedFeedbacks
                  ?.filter((f) => f.submitted == 0)
                  .slice(0, 5)
                  .map((form) => (
                    <Link
                      href={`/feedback/${form.formID}`}
                      key={`${form.form.title}`}
                      style={{ color: "inherit" }}
                    >
                      <Typography sx={{ mb: 1 }}>
                        {form.form.title}{" "}
                        <LaunchRoundedIcon sx={{ fontSize: "inherit" }} />
                      </Typography>
                    </Link>
                  ))}
              </Box>
            )}
            <Box sx={{ position: "absolute", right: 0, bottom: 0, m: 1 }}>
              <Link href="/feedback">
                <Button size="small">Go to feedback</Button>
              </Link>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: "100%", position: "relative" }}>
            <Typography variant="button">Mentor</Typography>
            {user.mentor ? (
              <Fragment>
                <Box sx={{ my: 2 }}>
                  <Typography variant="caption">Mentor name</Typography>
                  <Typography variant="body2">{user.mentor?.name}</Typography>
                </Box>
                <Box sx={{ my: 2 }}>
                  <Typography variant="caption">Mentor Reg No</Typography>
                  <Typography variant="body2">{user.mentor?.regno}</Typography>
                </Box>
                <Box sx={{ my: 2 }}>
                  <Typography variant="caption">Mentor Email</Typography>
                  <Typography variant="body2">{user.mentor?.email}</Typography>
                </Box>
              </Fragment>
            ) : (
              <Typography variant="body1" sx={{ my: 2 }}>
                No mentor is assigned to you
              </Typography>
            )}
            <Box sx={{ position: "absolute", right: 0, bottom: 0, m: 1 }}>
              {user.mentor ? (
                <Link href="/mentor">
                  <Button size="small">Go to mentor</Button>
                </Link>
              ) : (
                <Link href="/mentor/select">
                  <Button size="small">Select mentor</Button>
                </Link>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {(user.type === "admin" || user.type == "mentor") && (
        <Box sx={{ my: 4 }}>
          <Typography variant="button">For {user.type}s</Typography>
          <Box sx={{ display: {xs: "block", md: "flex"}, mt: 2, flexWrap: "wrap" }}>
            <Link
              href="/mentees"
              style={{ marginRight: 20, marginBottom: 20, textDecoration: "none" }}
            >
              <Card
                sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 3, py: 2 }}
              >
                <Box sx={{ mr: 2 }}>
                  <Typography variant="body2">View my</Typography>
                  <Typography variant="h5">Mentees</Typography>
                </Box>
                <ChevronRightRoundedIcon fontSize="large" />
              </Card>
            </Link>
            {user.type === "admin" && (
              <Fragment>
                <Link
                  href="/students"
                  style={{ marginRight: 20, marginBottom: 20, textDecoration: "none" }}
                >
                  <Card
                    sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 3, py: 2 }}
                  >
                    <Box sx={{ mr: 2 }}>
                      <Typography variant="body2">View all</Typography>
                      <Typography variant="h5">Students</Typography>
                    </Box>
                    <ChevronRightRoundedIcon fontSize="large" />
                  </Card>
                </Link>
                <Link
                  href="/students/add"
                  style={{ marginRight: 20, marginBottom: 20, textDecoration: "none" }}
                >
                  <Card
                    sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 3, py: 2 }}
                  >
                    <Box sx={{ mr: 2 }}>
                      <Typography variant="body2">Add new</Typography>
                      <Typography variant="h5">Students</Typography>
                    </Box>
                    <ChevronRightRoundedIcon fontSize="large" />
                  </Card>
                </Link>
                <Link
                  href="/forms"
                  style={{ marginRight: 20, marginBottom: 20, textDecoration: "none" }}
                >
                  <Card
                    sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 3, py: 2 }}
                  >
                    <Box sx={{ mr: 2 }}>
                      <Typography variant="body2">View all</Typography>
                      <Typography variant="h5">Forms</Typography>
                    </Box>
                    <ChevronRightRoundedIcon fontSize="large" />
                  </Card>
                </Link>
                <Link
                  href="/forms/create"
                  style={{ marginRight: 20, marginBottom: 20, textDecoration: "none" }}
                >
                  <Card
                    sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 3, py: 2 }}
                  >
                    <Box sx={{ mr: 2 }}>
                      <Typography variant="body2">Create a</Typography>
                      <Typography variant="h5">New Form</Typography>
                    </Box>
                    <ChevronRightRoundedIcon fontSize="large" />
                  </Card>
                </Link>
              </Fragment>
            )}
          </Box>
        </Box>
      )}
    </Layout>
  );
}

export default HomePage;
