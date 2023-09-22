import BulkDataGrid from "@/components/BulkDataGrid";
import Heading from "@/components/Heading";
import Layout from "@/components/Layout";
import ListProfiles from "@/components/ListProfiles";
import Protected from "@/components/Protected";
import { AppContext } from "@/utils/context";
import type { UserType } from "@/utils/types";
import { Box, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";

/**
 * 
 * @returns React.Component - A page that displays the current user's mentees
 */
function MenteesPage() {

  // fetch user data from context
  const { user } = useContext(AppContext);

  // fetch mentees from API
  const [mentees, setMentees] = useState<Array<UserType> | any>(user.mentees);
  // useEffect(() => {
  //   if (user.regno) {
  //     fetch(`/api/mentees/${user.regno}`)
  //       .then((res) => res.json())
  //       .then((d) => setMentees(d));
  //   }
  // }, []);

  return (
    <Layout title="My Mentees | EMT Mentorship Portal">
      <Protected type="mentor">
        <Heading>My Mentees</Heading>
        {user.mentees?.length == 0 ? (
          <Box sx={{ py: 10 }}>
            <Typography textAlign="center">
              You don&apos;t have any mentees
            </Typography>
          </Box>
        ) : (
          <ListProfiles profiles={user.mentees} />
        )}
      </Protected>
    </Layout>
  );
}

export default MenteesPage;