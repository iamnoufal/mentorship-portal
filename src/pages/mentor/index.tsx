import { Fragment, useContext } from "react";
import Link from "next/link";
import Heading from "@/components/Heading";
import Layout from "@/components/Layout";
import { Typography, Button, Box } from "@mui/material";
import { AppContext } from "@/utils/context";

function MentorPage() {
  // fetch user data from context
  const { user } = useContext(AppContext);

  return (
    <Layout title="Mentors | Mentorship Portal">
      <Heading>Your Mentor</Heading>
      {user.type === "admin" ? (
        <Typography textAlign="center" sx={{ mt: 4 }} variant="body1">
          Hey! You are an admin, why do you need a mentor?
        </Typography>
      ) : (
        <Fragment>
          {user.mentor ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                alignItems: "center",
                py: 4,
              }}
            >
              Mentor Name: {user.mentor.name}
              <br />
              Mentor Email ID: {user.mentor.email}
              <br />
              Mentor Reg No: {user.mentor.regno}
              <br />
              <Link
                href={"mailto:" + user.mentor.email}
                rel="noreferrer"
                target="_blank"
                style={{ marginTop: 20, width: "fit-content" }}
              >
                <Button variant="contained">Contact Mentor</Button>
              </Link>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                alignItems: "center",
                py: 4,
              }}
            >
              <Typography variant="body1">
                There is no mentor assigned to you.
              </Typography>
              <Link
                href="/mentor/select"
                style={{ marginTop: 20, width: "fit-content" }}
              >
                <Button variant="contained">Select Mentor</Button>
              </Link>
            </Box>
          )}
        </Fragment>
      )}
    </Layout>
  );
}

export default MentorPage;
