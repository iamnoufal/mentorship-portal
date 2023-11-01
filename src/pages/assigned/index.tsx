import FormList from "@/components/FormList";
import Heading from "@/components/Heading";
import Layout from "@/components/Layout";
import { AppContext } from "@/utils/context";
import { Container } from "@mui/material";
import { useContext } from "react";

function FeedbacksPage() {
  // fetch user data from context
  const { user } = useContext(AppContext);

  // fetch feedbacks assigned to the user
  const data =
    user?.assignedFeedbacks
      ?.filter((a) => a.submitted == 0)
      .map((form) => form.form) || [];

  return (
    <Layout title="Tasks | Mentorship Portal">
      <Heading>Assigned Tasks</Heading>
      <Container maxWidth="md" sx={{ py: 5 }}>
        <FormList data={data} />
      </Container>
    </Layout>
  );
}

export default FeedbacksPage;
