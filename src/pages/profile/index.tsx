import { useContext } from "react";
import { AppContext } from "@/utils/context";
import Layout from "@/components/Layout";
import Link from "next/link";
import { Typography, Button } from "@mui/material";
import Profile from "@/components/Profile";

function ProfilePage() {

  // fetch user data from context
  const { user } = useContext(AppContext);

  return (
    <Layout title="Profile | Mentorship Portal">
      <Typography variant="h4" textAlign="center">
        Profile
      </Typography>
      <Profile
        user={user}
        actions={
          <Link
            href="/profile/edit"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <Button variant="contained" sx={{ width: "100%", mt: 3 }}>
              Edit Profile
            </Button>
          </Link>
        }
      />
    </Layout>
  );
}

export default ProfilePage;
