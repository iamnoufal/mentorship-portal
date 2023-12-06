import { UserType } from "@/utils/types";
import { Grid, Typography, Chip, Button, Box } from "@mui/material";
import Link from "next/link";
import UserAvatar from "./Avatar";

function Profile({ user, actions }: { user: UserType; actions?: any }) {
  return (
    <Grid container sx={{ py: 5 }}>
      <Grid item xs={12} lg={8} sx={{ px: 3 }}>
        <Grid container sx={{ my: 4 }}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography variant="h6">Name</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography variant="body1">{user.name}</Typography>
          </Grid>
        </Grid>
        <Grid container sx={{ my: 4 }}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography variant="h6">Reg No</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography variant="body1">{user.regno}</Typography>
          </Grid>
        </Grid>
        <Grid container sx={{ my: 4 }}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography variant="h6">Email ID</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography variant="body1">{user.email}</Typography>
          </Grid>
        </Grid>
        <Grid container sx={{ my: 4 }}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography variant="h6">Department</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography variant="body1">{user.department}</Typography>
          </Grid>
        </Grid>
        <Grid container sx={{ my: 4 }}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography variant="h6">Year</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography variant="body1">{user.year}</Typography>
          </Grid>
        </Grid>
        <Grid container sx={{ my: 4 }}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography variant="h6">Birthday</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography variant="body1">
              {user.birthday
                ? new Date(user.birthday).toDateString()
                : "Not set"}
            </Typography>
          </Grid>
        </Grid>
        <Grid container sx={{ my: 4 }}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography variant="h6">Skills</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
          >
            {user.skills && user!.skills!.length != 0
              ? user!.skills!.map((skill) => (
                  <Chip label={skill} key={skill} sx={{ mr: 1, mt: 2 }} />
                ))
              : "None"}
          </Grid>
        </Grid>
        <Grid container sx={{ my: 4 }}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography variant="h6">Hobbies</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
          >
            {user.hobbies && user!.hobbies!.length != 0
              ? user!.hobbies!.map((hobby) => (
                  <Chip label={hobby} key={hobby} sx={{ mr: 1, mt: 2 }} />
                ))
              : "None"}
          </Grid>
        </Grid>
        {(user.type === "mentor" || user.type === "admin") && (
          <Grid container sx={{ my: 4 }}>
            <Grid
              item
              xs={12}
              md={4}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography variant="h6">Mentees</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={8}
              sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
            >
              {user.mentees && user!.mentees!.length != 0
                ? user!.mentees!.map((mentee) => (
                    <Link
                      href={`/students/${mentee.email}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                      key={mentee.email}
                    >
                      <Chip
                        label={mentee.name}
                        key={mentee.email}
                        sx={{ mr: 1, mt: 2 }}
                      />
                    </Link>
                  ))
                : "None"}
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item xs={12} lg={4} sx={{ mt: { xs: 4, md: 0 } }}>
        <Box
          sx={{
            px: 12,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {user.image ? (
            <img src={user.image} width="100%" alt={user.name} />
          ) : (
            <UserAvatar name={user.name} />
          )}
          {actions}
        </Box>
      </Grid>
    </Grid>
  );
}

export default Profile;
