import Layout from "@/components/Layout";
import { Typography } from "@mui/material";
import Profile from "@/components/Profile";
import { UserType } from "@/utils/types";
import Heading from "@/components/Heading";

function AssociateProfilePage({ user }: { user: UserType }) {
  return (
    <Layout title={user.name + " | EMT Mentorship Portal"}>
      <Heading>{user.name}</Heading>
      <Profile user={user} />
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const { email } = context.query;
  const res = await fetch(`${process.env.BACKEND_URI}/user/${email}`);
  const user = await res.json();
  if (res.status != 200 || user == null) return { notFound: true };
  console.log(user)
  return {
    props: {
      user,
    },
  };
}

export default AssociateProfilePage;
