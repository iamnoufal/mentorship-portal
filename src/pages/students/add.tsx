import { ChangeEvent, useState } from "react";
import { UserDefaultData } from "@/utils/context";
import type { UserType } from "@/utils/types";
import Layout from "@/components/Layout";
import {
  Typography,
  Box,
  TextField,
  Button,
  Stack,
  Divider,
  Grid,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { read, utils } from "xlsx";
import BulkDataGrid from "@/components/BulkDataGrid";
import Protected from "@/components/Protected";
import DownloadIcon from "@mui/icons-material/Download";
import exportExcel from "@/helpers/exportExcel";
import editField from "@/helpers/editField";

function AddMenteePage() {
  // user state
  const [user, setUser] = useState<UserType>(UserDefaultData);
  // set to true if the form is saved
  const [saving, setSaving] = useState<boolean>(false);
  // set to true if the form is being saved. used for loader
  const [saved, setSaved] = useState<boolean>(false);
  // alert message
  const [alert, setAlert] = useState<string>("");
  // bulk data state
  const [bulkData, setBulkData] = useState<
    Array<UserType> | unknown[] | undefined
  >();

  // function to import excel file
  const importExcel = (event: ChangeEvent<HTMLInputElement>) => {
    setSaved(false);
    const file = event.currentTarget.files![0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const buffer = e.target?.result;
      const workbook = read(buffer, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      let data : Array<UserType> = utils.sheet_to_json(worksheet);
      data = data.map((d: UserType) => Object({ ...d, regno: d.regno.toString(), year: d.year.toString() }));
      console.log(data)
      setBulkData(data);
    };
    reader.readAsArrayBuffer(file);
  };

  // function to handle form submit
  const handleSubmit = () => {
    setSaving(true);
    if (bulkData) {
      console.log("adding bulk data")
      for (let i = 0; i<bulkData.length; i++) {
        fetch("/api/user/add", {
          method: "POST",
          body: JSON.stringify(bulkData[i]),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data.message)
            if (data.code == 200) {
              console.log(i, bulkData.length)
              if (i == bulkData.length-1) {
                setBulkData(undefined)
                setSaving(false);
                setSaved(true);
                setTimeout(() => setSaved(false), 5000)
              } 
            } else {
              setAlert(data.message);
            }
          });
      }
    } else {
      fetch("/api/user/add", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code == 200) {
            setUser(UserDefaultData);
          } else {
            setAlert(data.message);
          }
          setSaving(false);
          setSaved(true);
          setTimeout(() => setSaved(false), 5000)
        });
    }
  };

  return (
    <Layout title="Add Students | Mentorship Portal">
      <Protected type="admin">
        <Box>
          <Typography variant="h4" textAlign="center">
            Add Student Info
          </Typography>
          <input
            type="file"
            accept=".xlsx"
            style={{ display: "none" }}
            id="bulkImport"
            onChange={importExcel}
          />
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
            sx={{ mt: 3 }}
          >
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              onClick={() => document.getElementById("bulkImport")?.click()}
            >
              Bulk Import
            </Button>
            <Button
              color="inherit"
              onClick={() =>
                exportExcel(
                  [
                    {
                      name: "ABC XYZ",
                      regno: "XXXXXXX",
                      email: "abcd.0000000@gct.ac.in",
                      department: "YYY",
                      year: "1",
                    },
                  ],
                  "mentorship_add_students_template.xlsx"
                )
              }
            >
              <DownloadIcon />
            </Button>
          </Stack>
          {!bulkData ? (
            <Box>
              <Grid container sx={{ mt: 3 }}>
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
                    onChange={(e) => editField("name", e.target.value, setUser)}
                    label="Name"
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
                    value={user.regno}
                    onChange={(e) => editField("regno", e.target.value, setUser)}
                    label="Reg No"
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
                    value={user.email}
                    onChange={(e) =>
                      editField("email", e.target.value, setUser)
                    }
                    label="Email ID"
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
                    value={user.department}
                    onChange={(e) =>
                      editField("department", e.target.value, setUser)
                    }
                    label="Department"
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
                    value={user.year}
                    onChange={(e) =>
                      editField("year", e.target.value, setUser)
                    }
                    type="number"
                    label="Year"
                  />
                </Grid>
              </Grid>
            </Box>
          ) : (
            <BulkDataGrid data={bulkData} />
          )}
          <LoadingButton
            onClick={saved ? console.log : handleSubmit}
            loading={saving}
            loadingPosition="start"
            color={saved ? (alert === "" ? "success" : "error") : "primary"}
            startIcon={
              saved ? (
                alert === "" ? (
                  <CheckCircleOutlineIcon />
                ) : (
                  <WarningAmberIcon />
                )
              ) : (
                <SaveIcon />
              )
            }
            variant="contained"
            sx={{ width: "100%", mt: 3 }}
          >
            <span>{saved ? (alert === "" ? "Saved!" : alert) : "Save"}</span>
          </LoadingButton>
        </Box>
      </Protected>
    </Layout>
  );
}

export default AddMenteePage;
