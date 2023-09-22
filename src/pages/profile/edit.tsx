import { ChangeEvent, SyntheticEvent, useContext, useState } from "react";
import { AppContext } from "@/utils/context";
import type { UserType } from "@/utils/types";
import Layout from "@/components/Layout";
import UserAvatar from "@/components/Avatar";
import {
  Typography,
  Chip,
  Grid,
  Box,
  TextField,
  Autocomplete,
  ImageListItemBar,
  IconButton,
  ImageListItem,
  Switch,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import editField from "@/helpers/editField";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function ProfilePage() {

  // fetch user data from context
  const { user, setUser } = useContext(AppContext);

  // create saving and saved states
  const [saving, setSaving] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  // create edited fields state
  const [editedFields, setEditedFields] = useState<Object>(new Object());

  // create edit function which is triggered on change of any field. modifies the editedFields state
  const edit = (key: keyof UserType, value: any): void => {
    setSaved(false);
    editField(key, value, setUser);
    editField(key, value, setEditedFields);
  };

  // create editImage function which is triggered on change of the image field. modifies the editedFields state
  const editImage = (event: ChangeEvent<HTMLInputElement>): void => {
    let imageFile = event.currentTarget.files![0];
    const reader = new FileReader();
    reader.onloadend = () => edit("image", reader.result);
    reader.readAsDataURL(imageFile);
  };

  // create handleSubmit function which is triggered on clicking the save button. makes a PUT request to the API
  const handleSubmit = () => {
    setSaving(true);
    fetch(`/api/user/${user.regno.toLowerCase()}`, {
      method: "PUT",
      body: JSON.stringify(editedFields),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code == 200) {
          setSaving(false);
          setSaved(true);
        }
      });
  };

  return (
    <Layout title="Edit Profile | EMT Mentorship Portal">
      <Typography variant="h4" textAlign="center">
        Edit my Profile
      </Typography>
      <Grid container sx={{ py: 5 }}>
        <Grid item xs={12} md={8} sx={{ px: 3 }}>
          <Grid container sx={{ my: 4 }}>
            <Grid
              item
              xs={12}
              lg={4}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography variant="h6">Name</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              lg={8}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <TextField
                sx={{ width: "100%" }}
                value={user.name}
                onChange={(e) => edit("name", e.target.value)}
                label="Name"
              />
            </Grid>
          </Grid>
          <Grid container sx={{ my: 4 }}>
            <Grid
              item
              xs={12}
              lg={4}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography variant="h6">Reg No</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              lg={8}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <TextField
                sx={{ width: "100%" }}
                disabled
                value={user.regno}
                label="Reg No"
              />
            </Grid>
          </Grid>
          <Grid container sx={{ my: 4 }}>
            <Grid
              item
              xs={12}
              lg={4}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography variant="h6">Email ID</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              lg={8}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <TextField
                sx={{ width: "100%" }}
                disabled
                value={user.email}
                label="Email ID"
              />
            </Grid>
          </Grid>
          <Grid container sx={{ my: 4 }}>
            <Grid
              item
              xs={12}
              lg={4}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography variant="h6">Department</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              lg={8}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <TextField
                sx={{ width: "100%" }}
                disabled
                value={user.department}
                label="Department"
              />
            </Grid>
          </Grid>
          <Grid container sx={{ my: 4 }}>
            <Grid
              item
              xs={12}
              lg={4}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography variant="h6">Year</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              lg={8}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <TextField
                sx={{ width: "100%" }}
                disabled
                value={user.year}
                label="year"
              />
            </Grid>
          </Grid>
          <Grid container sx={{ my: 4 }}>
            <Grid
              item
              xs={12}
              lg={4}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography variant="h6">Birthday</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              lg={8}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <DatePicker
                sx={{ width: "100%" }}
                value={user.birthday ? dayjs(user.birthday) : null}
                onChange={(val) => edit("birthday", val)}
                format="DD/MM/YYYY"
              />
            </Grid>
          </Grid>
          <Grid container sx={{ my: 4 }}>
            <Grid
              item
              xs={12}
              lg={4}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography variant="h6">Skills</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              lg={8}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Autocomplete
                multiple
                limitTags={2}
                options={user!.skills?.map((option) => option) || []}
                value={user.skills}
                freeSolo
                renderTags={(value: readonly string[]) =>
                  value.map((option: string) => (
                    <Chip variant="outlined" label={option} key={option} />
                  ))
                }
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="Skills" />
                )}
                onChange={(
                  event: SyntheticEvent<Element, Event>,
                  value: string[]
                ) => edit("skills", value)}
                sx={{ width: "100%" }}
              />
            </Grid>
          </Grid>
          <Grid container sx={{ my: 4 }}>
            <Grid
              item
              xs={12}
              lg={4}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography variant="h6">Hobbies</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              lg={8}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Autocomplete
                multiple
                limitTags={2}
                options={user!.hobbies?.map((option) => option) || []}
                value={user.hobbies}
                freeSolo
                renderTags={(value: readonly string[]) =>
                  value.map((option: string) => (
                    <Chip variant="outlined" label={option} key={option} />
                  ))
                }
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="Hobbies" />
                )}
                onChange={(
                  event: SyntheticEvent<Element, Event>,
                  value: string[]
                ) => edit("hobbies", value)}
                sx={{ width: "100%" }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              px: 12,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <ImageListItem>
              {user.image ? (
                <img src={user.image} width="100%" alt={user.name} />
              ) : (
                <UserAvatar name={user.name} />
              )}
              <ImageListItemBar
                sx={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7) 0%, " +
                    "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                }}
                title="Edit Image"
                position="bottom"
                actionPosition="right"
                actionIcon={
                  <IconButton
                    sx={{ color: "white" }}
                    onClick={() =>
                      document.getElementById("userImageUpload")?.click()
                    }
                  >
                    <EditIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
            <input
              type="file"
              style={{ display: "none" }}
              accept="image/jpg, image/jpeg, image/png, image/webp"
              id="userImageUpload"
              onChange={editImage}
            />
            <LoadingButton
              onClick={saved ? console.log : handleSubmit}
              loading={saving}
              loadingPosition="start"
              color={saved ? "success" : "primary"}
              startIcon={saved ? <CheckCircleOutlineIcon /> : <SaveIcon />}
              variant="contained"
              sx={{ width: "100%", mt: 3 }}
            >
              <span>{saved ? "Saved!" : "Save"}</span>
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default ProfilePage;
