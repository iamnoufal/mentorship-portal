import { useContext } from "react";
import { AppContext } from "@/utils/context";
import Layout from "@/components/Layout";
import Link from "next/link";
import { Typography, Button, Box } from "@mui/material";
import Profile from "@/components/Profile";

function ProfilePage() {

  // fetch user data from context
  const { user, setUser } = useContext(AppContext);

  const handleChangeMentor = async (email: string) => {
      fetch(`/api/user/${email}`, {
        method: "PUT",
        body: JSON.stringify({ type: "mentor" }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code == 200) {
            setUser({ ...user, type: "mentor" })
          }
        });
  };

  return (
    <Layout title="Profile | Mentorship Portal">
      <Typography variant="h4" textAlign="center">
        Profile
      </Typography>
      <Profile
        user={user}
        actions={
          <Box>
            <Link
              href="/profile/edit"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Button variant="contained" sx={{ width: "100%", mt: 3 }}>
                Edit Profile
              </Button>
            </Link>
            {parseInt(user.year) <= 2025 && user.type === "student" && (
              <Button variant="contained" sx={{ width: "100%", mt: 3 }}>
                Be a Mentor
              </Button>
            )}
          </Box>
        }
      />
    </Layout>
  );
}

export default ProfilePage;
