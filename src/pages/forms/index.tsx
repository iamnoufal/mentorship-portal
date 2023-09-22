import FormList from "@/components/FormList";
import Heading from "@/components/Heading";
import Layout from "@/components/Layout";
import Protected from "@/components/Protected";
import { Container, Button, Box } from "@mui/material";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import Link from "next/link";

function FeedbacksPage({ data }: any) {
  return (
    <Layout title="Forms | EMT Mentorship Portal">
      <Protected type="admin">
        <Container maxWidth="md" sx={{ py: 5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              mb: 4,
            }}
          >
            <Heading align="left">Forms</Heading>
            <Link href="/forms/create">
              <Button variant="contained">
                New <ControlPointRoundedIcon sx={{ ml: 1, fontSize: 18 }} />
              </Button>
            </Link>
          </Box>
          <FormList data={data} />
        </Container>
      </Protected>
    </Layout>
  );
}

// fetch all forms from backend
export async function getServerSideProps() {
  const resp = await fetch(`${process.env.BACKEND_URI}/form/all`);
  const data = await resp.json();
  return { props: { data } };
}

export default FeedbacksPage;
