import Heading from "@/components/Heading";
import Layout from "@/components/Layout";
import SubHeading from "@/components/SubHeading";
import { Box, Grid, Paper, Typography } from "@mui/material";

function AboutPage() {
  return (
    <Layout title="About and Guidelines | Mentorship Tool">
      <Heading>Guidelines</Heading>
      <Grid container spacing={3} sx={{ my: 3 }}>
        <Grid item md={6}>
          <Paper sx={{ height: "100%", py: 3 }}>
            <SubHeading>For Mentors</SubHeading>
            <Box component="ul" sx={{mr: 3}}>
              <Typography component="li">
                Schedule the discussion to understand what mentee aspires to
                learn & support.
              </Typography>
              <Typography component="li">
                Schedule minimum 1 hr discussion with Mentee in a month and keep
                the learning interesting, adapt holistic way
              </Typography>
              <Typography component="li">
                Guide Mentee to think beyond scope of work to result in
                futuristic thinking.
              </Typography>
              <Typography component="li">
                Suggest trainings Mentee need to take in current year and assess
                feedback
              </Typography>
              <Typography component="li">
                Let this be a learning which can be remembered and relished
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item md={6}>
          <Paper sx={{ height: "100%", py: 3 }}>
            <SubHeading>For Mentees</SubHeading>
            <Box component="ul" sx={{mr: 3}}>
              <Typography component="li">
                Drive the agenda for initial discussion with Mentor and state
                aspiration of topics to learn.
              </Typography>
              <Typography component="li">
                Prepare agenda for discussion with Mentor along with topics and
                update on previous accomplishment
              </Typography>
              <Typography component="li">
                Track your Plan for closure. Seek help from Mentor as needed
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default AboutPage;
