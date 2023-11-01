import Layout from "@/components/Layout";
import { Typography } from "@mui/material";
import Profile from "@/components/Profile";
import { UserType } from "@/utils/types";
import Heading from "@/components/Heading";

function StudentProfilePage({ user }: { user: UserType }) {
  return (
    <Layout title={user.name + " | Mentorship Portal"}>
      <Heading>{user.name}</Heading>
      <Profile user={user} />
    </Layout>
  );
}

export async function getStaticProps({ params } : any) {
  const email = params.email;
  const res = await fetch(`${process.env.BACKEND_URI}/user/${email}`);
  const user = await res.json();
  if (res.status != 200 || user == null) return { notFound: true };
  return {
    props: {
      user,
    },
  };
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.BACKEND_URI}/user/all`);
  const data = await res.json();
  return {
    paths: data.map((user : UserType) => {
      return {
        params: {
          email: user.email,
        },
      };
    }),
    fallback: "blocking",
  };
}

export default StudentProfilePage;
