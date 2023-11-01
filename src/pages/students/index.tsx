import Heading from "@/components/Heading";
import Layout from "@/components/Layout";
import Protected from "@/components/Protected";
import { Box, Button, IconButton, Switch, Tooltip } from "@mui/material";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import { UserType } from "@/utils/types";
import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";
import ListProfiles from "@/components/ListProfiles";

function StudentsPage({ data }: { data: Array<UserType> }) {
  // state to set all the users
  const [users, setUsers] = useState<Array<UserType>>(data);
  // state to set all the mentors
  const [mentors, setMentors] = useState<Array<string>>(
    data
      // filtering out admins and mentors from the data to set mentors state
      .filter((d: { type: string }) => d.type == "mentor" || d.type == "admin")
      // mapping the data to get only the regno
      .map((d: { email: any }) => d.email)
  );

  // router for navigation
  const router = useRouter();

  // handle change in mentor switch
  const handleChangeMentor = async (email: string) => {
    if (mentors?.indexOf(email) == -1) {
      fetch(`/api/user/${email}`, {
        method: "PUT",
        body: JSON.stringify({ type: "mentor" }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code == 200) {
            let m = mentors;
            m.push(email);
            setMentors(m);
          }
        });
    } else {
      fetch(`/api/user/${email}`, {
        method: "PUT",
        body: JSON.stringify({ type: "student" }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code == 200) {
            let m = mentors;
            m?.splice(m.indexOf(email), 1);
            setMentors(m);
          }
        });
    }
  };

  return (
    <Layout title="Asssociates | Mentorship Portal">
      <Protected type="admin">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Heading align="left">Students</Heading>
          <Button
            onClick={() => router.push("/students/add")}
            variant="contained"
          >
            Add Students
          </Button>
        </Box>
        {users && (
          <ListProfiles
            profiles={users.map((d: any, index: number) =>
              Object({
                ...d,
                actions: [
                  <Tooltip key={d.email + "mentorbutton"} title="Mentor">
                    <span>
                      <Switch
                        defaultChecked={d.type == "mentor" || d.type == "admin"}
                        disabled={d.type == "admin"}
                        onChange={(e: ChangeEvent) => handleChangeMentor(d.email)}
                        size="small"
                      />
                    </span>
                  </Tooltip>,
                  <Tooltip key={d.email + "deleteuser"} title="Delete User">
                    <span>
                      <IconButton
                        onClick={() => {
                          fetch(`/api/user/${d.email}`, {
                            method: "DELETE",
                          }).then((r) => {
                            if (r.status == 200) {
                              let assocs = users;
                              assocs.splice(index, 1);
                              setUsers(assocs);
                            }
                          });
                        }}
                        disabled={d.type == "admin"}
                      >
                        <PersonRemoveRoundedIcon />
                      </IconButton>
                    </span>
                  </Tooltip>,
                ],
              })
            )}
          />
        )}
      </Protected>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const { formID } = context.query;
  const res = await fetch(`${process.env.BACKEND_URI}/user/all`);
  const data = await res.json();
  if (res.status != 200 || data == null) return { notFound: true };
  return {
    props: {
      data,
    },
  };
}

export default StudentsPage;
