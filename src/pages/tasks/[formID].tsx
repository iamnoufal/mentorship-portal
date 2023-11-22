import BulkDataGrid from "@/components/BulkDataGrid";
import Heading from "@/components/Heading";
import Layout from "@/components/Layout";
import Protected from "@/components/Protected";
import SubHeading from "@/components/SubHeading";
import { ResponseType, FormType, UserType } from "@/utils/types";
import {
  Container,
  IconButton,
  Paper,
  Stack,
  Tab,
  Box,
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Checkbox,
} from "@mui/material";
import { motion } from "framer-motion";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
  Fragment,
} from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Form from "@/components/Form";
import { AppContext } from "@/utils/context";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import exportExcel from "@/helpers/exportExcel";
import CopyButton from "@/components/CopyButton";

function ResponsesPage({ form }: { form: FormType }) {
  // router for navigation
  const router = useRouter();

  // fetch user data from context
  const { user } = useContext(AppContext);
  
  // set tab state, state values can be "form", "responses" or "assign"
  const [tab, setTab] = useState<string>("form");
  // set delete alert state, state values can be true or false
  const [deleteAlert, setDeleteAlert] = useState<boolean>(false);
  // set deleted state, state values can be true or false
  const [deleted, setDeleted] = useState<boolean>(false);
  // set response state, state values can be ResponseType
  const [response, setResponse] = useState<ResponseType>({
    formID: router.query.formID,
    regno: user.regno,
    values: form.fields.map((f) => Object({ value: "" })),
  });

  // set users state, state values can be Array<UserType>
  const [users, setUsers] = useState<Array<UserType>>([user]);
  // set assigned users state, state values can be Array<string>
  const [assignedUsers, setAssignedUsers] = useState<Array<any> | undefined>(
    form.assignedTo?.map((f) => f.email)
  );

  // Row component for responses table to render each response
  function Row({ response }: any) {
    const [open, setOpen] = useState(false);
    return (
      <Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell component="th" scope="row">
            {response.user.name}
          </TableCell>
          <TableCell>{response.user.regno}</TableCell>
          <TableCell>{response.user.department}</TableCell>
          <TableCell>{new Date(response.submittedAt).toUTCString()}</TableCell>
          <TableCell>
            <IconButton size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Form
                  form={form}
                  response={response}
                  action={console.log}
                  disabled
                />
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </Fragment>
    );
  }

  // fetch all users data
  useEffect(() => {
    if (user.mentees) {
      setUsers(user.mentees)
    }
  }, [setUsers]);

  // handle delete form
  const handleDelete = () => {
    fetch(`/api/form/${form.formID}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        if (data.code == 200) {
          setDeleted(true);
        } else {
          alert("Couldn't delete the form");
          setDeleteAlert(false);
        }
      });
  };

  return (
    <Layout title={form.title || ""}>
      <Protected type="mentor">
        <Container maxWidth="lg">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={0}
            sx={{ my: 4 }}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <Heading align="left">{form.title}</Heading>
              <SubHeading align="left">{form.description}</SubHeading>
            </motion.div>
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <IconButton
                onClick={() => router.push(`/assigned/${form.formID}`)}
              >
                <RemoveRedEyeRoundedIcon />
              </IconButton>
              <CopyButton
                text={`${process.env.NEXT_PUBLIC_BASE_URI}/assigned/${form.formID}`}
              />
              <IconButton
                onClick={() =>
                  exportExcel(
                    form.feedbacks?.map((f) => Object({ ...f, ...f.feedback })),
                    `${form.title?.replaceAll(" ", "_")}_responses.xlsx`
                  )
                }
              >
                <FileDownloadRoundedIcon />
              </IconButton>
              <IconButton onClick={() => setDeleteAlert(true)}>
                <DeleteRoundedIcon />
              </IconButton>
            </motion.div>
          </Stack>
          <Paper>
            <TabContext value={tab}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  variant="fullWidth"
                  onChange={(event: SyntheticEvent, value: string) =>
                    setTab(value)
                  }
                >
                  <Tab label="Form" value="form" />
                  <Tab label="Responses" value="responses" />
                  <Tab label="Assign" value="assign" />
                </TabList>
              </Box>
              <TabPanel value="form">
                <Form
                  form={form}
                  response={response}
                  action={setResponse}
                  disabled={true}
                />
              </TabPanel>
              <TabPanel value="responses">
                {form.responses?.length === 0 ? (
                  <Typography variant="body1" textAlign="center">
                    No Responses
                  </Typography>
                ) : (
                  <Table sx={{ width: "100%" }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Reg No</TableCell>
                        <TableCell>Department</TableCell>
                        <TableCell>Submitted at</TableCell>
                        <TableCell />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {form.responses.map((f: ResponseType) => (
                        <Row response={f} key={f.regno} />
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabPanel>
              <TabPanel value="assign">
                {/* {user.mentees!.length > 0 ? ( */}
                  <Box sx={{ overflow: 'auto', width: '100%' }}>
                    <BulkDataGrid
                      data={users.map((d) => {
                        const handleAssignment = (value: string) => {
                          if (assignedUsers?.indexOf(value) == -1) {
                            console.log("assigning");
                            fetch(`/api/form/${router.query.formID}/assign`, {
                              method: "POST",
                              body: JSON.stringify({ email: value }),
                              headers: {
                                "Content-Type": "application/json",
                              },
                            })
                              .then((res) => res.json())
                              .then((data) => {
                                if (data.code == 200) {
                                  let au = assignedUsers;
                                  au?.push(value);
                                  setAssignedUsers(au);
                                }
                              });
                          } else {
                            console.log("unassigning");
                            fetch(`/api/form/${router.query.formID}/unassign`, {
                              method: "POST",
                              body: JSON.stringify({ email: value }),
                              headers: {
                                "Content-Type": "application/json",
                              },
                            })
                              .then((res) => res.json())
                              .then((data) => {
                                if (data.code == 200) {
                                  let au = assignedUsers;
                                  au?.splice(au.indexOf(value), 1);
                                  setAssignedUsers(au);
                                }
                              });
                          }
                        };
                        return Object({
                          assign: (
                            <Checkbox
                              onClick={() => handleAssignment(d.email)}
                              defaultChecked={
                                assignedUsers?.indexOf(d.email) != -1
                              }
                            />
                          ),
                          regno: d.regno,
                          name: d.name,
                          department: d.department,
                        });
                      })}
                    />
                  </Box>
                {/* ) : (
                  <Box>
                    <Typography>
                      You don't have mentees to assign task
                    </Typography>
                  </Box>
                )} */}
              </TabPanel>
            </TabContext>
          </Paper>
        </Container>
        <Dialog open={deleteAlert} onClose={() => setDeleteAlert(false)}>
          <DialogTitle>Heads up!</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete &quot;{form.title}&quot; feedback
              form?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteAlert(false)}>No</Button>
            <Button onClick={handleDelete} autoFocus>
              Sure
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={deleted}
          autoHideDuration={6000}
          message="This form is deleted"
          action={
            <Button>
              <Link
                href="/forms"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Go Back
              </Link>
            </Button>
          }
        />
      </Protected>
    </Layout>
  );
}

export async function getStaticProps({ params } : any) {
  const formID = params.formID;
  const res = await fetch(`${process.env.BACKEND_URI}/form/${formID}`);
  const form = await res.json();
  if (res.status != 200 || form == null) return { notFound: true };
  return {
    props: {
      form,
    },
  };
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.BACKEND_URI}/form/all`);
  const data = await res.json();
  return {
    paths: data.map((form : FormType) => {
      return {
        params: {
          formID: form.formID,
        },
      };
    }),
    fallback: "blocking",
  };
}


export default ResponsesPage;
