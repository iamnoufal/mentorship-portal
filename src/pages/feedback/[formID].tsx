import { useContext, useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Layout from "@/components/Layout";
import { ResponseType } from "@/utils/types";
import Heading from "@/components/Heading";
import SubHeading from "@/components/SubHeading";
import { AppContext } from "@/utils/context";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Link from "next/link";
import { useRouter } from "next/router";
import Form from "@/components/Form";
import NotFoundPage from "../404";

function FeedbackFormPage({ form }: any) {
  // router for navigation
  const router = useRouter();

  // fetch user data from context
  const { user } = useContext(AppContext);

  // set to true if the form is saved
  const [saved, setSaved] = useState<boolean>(false);
  // set to true if the form is being saved. used for loader
  const [saving, setSaving] = useState<boolean>(false);
  // response state
  const [response, setResponse] = useState<ResponseType>({
    formID: router.query.formID,
    regno: user.regno,
    values: form.fields.map((f: { id: string }) =>
      Object({ fieldID: f.id, value: "" })
    ),
  });

  // check if the form is saved or if the respnose is submitted
  useEffect(() => {
    let filledForms = user.assignedFeedbacks
      ?.filter((f) => f.submitted == 1)
      .filter((f) => f.formID == form.formID);
    if (!saving) {
      if (filledForms?.length != 1) setSaved(false);
      else setSaved(true);
    }
  }, [user]);

  // check if the user is assigned the form
  if (
    user.assignedFeedbacks?.filter((f) => f.formID == form.formID).length != 1
  )
    return <NotFoundPage />;

  // handle form submit
  const handleSubmit = () => {
    setSaving(true);
    fetch(`/api/form/${form.formID}`, {
      method: "POST",
      body: JSON.stringify({
        ...response,
        formID: form.formID,
        regno: user.regno,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code == 200) {
          setSaved(true);
        } else {
          alert("Cannot save your feedback. Try again later");
        }
      });
  };

  return (
    <Layout title={form.title || ""}>
      <Heading>{form?.title}</Heading>
      <SubHeading>{form?.description}</SubHeading>
      {saved ? (
        <Box
          sx={{
            p: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            flexDirection: "column",
          }}
        >
          <Typography variant="body1">Your respone is recorded</Typography>
          <Link href="/home">
            <Button variant="contained">GO to home</Button>
          </Link>
        </Box>
      ) : (
        <Box sx={{ p: 5 }}>
          <Form form={form} response={response} action={setResponse} />
          <LoadingButton
            onClick={saved ? console.log : handleSubmit}
            loading={saving}
            loadingPosition="start"
            color={saved ? "success" : "primary"}
            startIcon={saved ? <CheckCircleOutlineIcon /> : <SaveIcon />}
            variant="contained"
            sx={{ width: "100%", mt: 3 }}
          >
            <span>{saved ? "Submitted!" : "Submit"}</span>
          </LoadingButton>
        </Box>
      )}
    </Layout>
  );
}

// fetch form data from API before rendering page
export async function getServerSideProps(context: any) {
  const { formID } = context.query;
  const res = await fetch(`${process.env.BACKEND_URI}/form/${formID}/get`);
  const form = await res.json();
  if (res.status != 200 || form == null) return { notFound: true };
  return {
    props: {
      form,
    },
  };
}

export default FeedbackFormPage;
