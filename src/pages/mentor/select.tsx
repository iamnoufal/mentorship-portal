import BulkDataGrid from "@/components/BulkDataGrid";
import Heading from "@/components/Heading";
import Layout from "@/components/Layout";
import SubHeading from "@/components/SubHeading";
import { useContext } from "react";
import { AppContext } from "@/utils/context";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import ListProfiles from "@/components/ListProfiles";

function SelectMentorPage({ data }: any) {
  // router for navigation
  const router = useRouter();

  // fetch user data from context
  const { user, setUser } = useContext(AppContext);

  // redirect to mentor page if mentor is already selected
  if (user.mentor) {
    router.push("/mentor");
  }

  // handle select button click. send POST request to API to assign mentor if user confirms
  const handleClick = (data: any) => {
    if (
      confirm(`Are you sure you want to select ${data.name} as your mentor?`)
    ) {
      fetch("/api/mentor/assign", {
        method: "POST",
        body: JSON.stringify({
          regno: user.regno,
          mentorID: data.regno,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        setUser({ ...user, mentor: data });
        router.push("/mentor");
      });
    }
  };

  // add select button to each mentor
  for (let i of data) {
    i.actions = (
      <Button size="small" variant="contained" onClick={() => handleClick(i)}>
        Select
      </Button>
    );
  }

  return (
    <Layout title="Select your mentor | Mentorship Portal">
      <Heading>Select your mentor</Heading>
      <SubHeading>Available Mentors</SubHeading>
      <ListProfiles profiles={data} />
    </Layout>
  );
}

// fetch available mentors from API before rendering page
export async function getServerSideProps() {
  const resp = await fetch(`${process.env.BACKEND_URI}/mentor/available`);
  let data = await resp.json();
  return { props: { data: data } };
}

export default SelectMentorPage;
