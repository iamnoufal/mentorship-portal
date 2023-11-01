import Heading from "@/components/Heading";
import Layout from "@/components/Layout";
import Protected from "@/components/Protected";
import { AppContext } from "@/utils/context";
import { FormType } from "@/utils/types";
import { LoadingButton } from "@mui/lab";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Container,
  Stack,
  Rating,
  Paper,
} from "@mui/material";
import { useContext, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@/components/Alert";
import { useRouter } from "next/router";
import editField from "@/helpers/editField";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

function CreateFormPage() {
  // fetch user data from context
  const { user, theme } = useContext(AppContext);

  // router for navigation
  const router = useRouter();

  // form state
  const [form, setForm] = useState<FormType>({
    createdBy: user.email,
    title: "",
    description: "",
    fields: [],
  });
  // true if the form is saved
  const [saved, setSaved] = useState<boolean>(false);
  // true if the form is being saved. used for loader
  const [saving, setSaving] = useState<boolean>(false);

  // add a text field to the form
  const addField = () => {
    let addedFields = form.fields;
    addedFields.push({ label: "", type: "text" });
    setForm({ ...form, fields: addedFields });
  };

  // add a rating field to the form
  const addRating = () => {
    let addedFields = form.fields;
    addedFields.push({ label: "", type: "rating" });
    setForm({ ...form, fields: addedFields });
  };

  // remove a field from the form
  const removeLabel = (index: number) => {
    let l = form.fields;
    l.splice(index, 1);
    setForm({ ...form, fields: l });
  };

  // handle form submit. send POST request to API to create form if all fields are filled
  const handleSubmit = () => {
    setSaving(true);
    for (let i of form.fields) {
      if (i.label == "") {
        alert(`A field cannot be empty. Check ${i.label}`);
        setSaving(false);
        return;
      }
    }
    fetch(`/api/form/create`, {
      method: "POST",
      body: JSON.stringify({ ...form, createdBy: user.email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.code == 200) {
          editField("link", data.link, setForm);
          setSaved(true);
        } else {
          alert("Cannot save your task. Try again later");
        }
        setSaving(false);
      });
  };

  return (
    <Layout title="Create Form | Mentorship Portal">
      <Protected type="admin">
        <Container maxWidth="md" sx={{ py: 2 }}>
          <Heading>Create a Task</Heading>
          <Box sx={{ py: 3 }}>
            <Paper elevation={theme == "dark" ? 8 : 4} sx={{ px: 3, py: 2 }}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  lg={4}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Typography variant="h6">Task Title</Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  lg={8}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <TextField
                    sx={{ width: "100%" }}
                    value={form["title"]}
                    onChange={(e) =>
                      editField("title", e.target.value, setForm)
                    }
                    label={`Title`}
                  />
                </Grid>
              </Grid>
              <Grid container sx={{ mt: 3 }}>
                <Grid
                  item
                  xs={12}
                  lg={4}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Typography variant="h6">Task Description</Typography>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <TextField
                    sx={{ width: "100%" }}
                    value={form["description"]}
                    onChange={(e) =>
                      editField("description", e.target.value, setForm)
                    }
                    label={`Description`}
                  />
                </Grid>
              </Grid>
            </Paper>
            {form.fields.map(
              (field: { type: string; label: string }, index: number) => {
                return (
                  <Paper
                    elevation={theme == "dark" ? 8 : 4}
                    sx={{ px: 3, py: 2, my: 2 }}
                    key={field.type + index}
                  >
                    <TextField
                      sx={{ width: "100%" }}
                      value={field.label}
                      onChange={(e) =>
                        editField(
                          "fields",
                          form.fields.map(
                            (f: { type: string; label: string }, i: number) => {
                              if (i == index) {
                                return {
                                  label: e.target.value as string,
                                  type: field.type,
                                };
                              } else return f;
                            }
                          ),
                          setForm
                        )
                      }
                      label="Milestone"
                    />
                    <Box sx={{ my: 2 }}>
                      {field.type === "text" ? (
                        <TextField
                          sx={{ width: "100%" }}
                          value="Milestone feedback"
                          multiline
                          rows={2}
                          disabled={true}
                        />
                      ) : (
                        <Rating
                          name={field.label}
                          value={0}
                          max={10}
                          disabled={true}
                          size="large"
                          icon={
                            <StarRoundedIcon
                              fontSize="large"
                              sx={{ color: "text.primary", opacity: 0.7 }}
                            />
                          }
                          emptyIcon={
                            <StarOutlineRoundedIcon
                              fontSize="large"
                              sx={{ color: "text.primary", opacity: 0.4 }}
                            />
                          }
                        />
                      )}
                    </Box>
                    <Stack direction="row" justifyContent="end">
                      <Button
                        onClick={() => removeLabel(index)}
                        color="inherit"
                      >
                        <DeleteIcon />
                      </Button>
                    </Stack>
                  </Paper>
                );
              }
            )}
            <Stack
              direction="row"
              justifyContent="center"
              spacing={3}
              sx={{ my: 3 }}
            >
              <Button variant="contained" onClick={addField}>
                Add Milestone
              </Button>
              <LoadingButton
                onClick={saved ? console.log : handleSubmit}
                loading={saving}
                loadingPosition="start"
                color={saved ? "success" : "primary"}
                startIcon={saved ? <CheckCircleOutlineIcon /> : <SaveIcon />}
                variant="contained"
                sx={{ mt: 3 }}
              >
                <span>{saved ? "Created!" : "Create"}</span>
              </LoadingButton>
            </Stack>
          </Box>
          <Alert
            title="Success"
            message="Feedback form created successfully"
            next={() => router.push(form.link.replace("assigned", "tasks"))}
            open={saved}
          />
        </Container>
      </Protected>
    </Layout>
  );
}

export default CreateFormPage;
