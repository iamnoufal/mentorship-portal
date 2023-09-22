import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { UserType } from "@/utils/types";
import Link from "next/link";

interface ListProfileType extends UserType {
  actions: Array<any>
}

/**
 * @param profiles Array<UserType> - Array of users to be displayed
 * @returns React.Component - A card list with the profiles passed in
 * @example
 * <ListProfiles profiles={users} />
 * @see
 * https://mui.com/material-ui/react-table/#sorting-amp-selecting
 * https://mui.com/components/autocomplete/#autocomplete
 * https://mui.com/components/text-fields/#standard-text-field
 */
function ListProfiles({ profiles }: Array<ListProfileType> | any) {
  const initialRows = profiles;
  const initialColumns = Object.keys(profiles[0]);

  // rows to be displayed
  const [rows, setRows] = useState<Array<ListProfileType>>(initialRows);
  // query to filter rows
  const [query, setQuery] = useState<{ field: string; value: string }>({
    field: "",
    value: "",
  });

  // function to handle query change for filtering rows
  const handleQueryChange = (value: string) => {
    if (value != "" && value != null)
      setRows(
        initialRows.filter((u: UserType) => {
          if (query.field == "skills" || query.field == "hobbies") {
            let values = u[query.field]?.join(", ").toLowerCase();
            return values?.includes(value);
          } else if (typeof u[query.field as keyof UserType] == "number") {
            return u[query.field as keyof UserType] == parseInt(value);
          }
          return (u[query.field as keyof UserType] as string)
            .toLowerCase()
            .includes(value.toLowerCase());
        })
      );
    else setRows(initialRows);
  };

  return (
    <Box sx={{ width: "100%", overflow: "hidden", mt: 3, pt: 1 }}>
      <Stack direction="row">
        <Autocomplete
          options={initialColumns.filter(
            (c) =>
              c != "image" && c != "action" && c != "assign" && c != "mentor"
          )}
          renderInput={(params) => <TextField {...params} label="Filter" />}
          onChange={(
            event: SyntheticEvent<Element, Event>,
            value: string | null
          ) => setQuery({ field: value as string, value: "" })}
          sx={{ width: "100%", mr: 2 }}
        />
        <TextField
          value={query.value}
          onChange={(event) => {
            setQuery({ ...query, value: event.target.value as string });
            handleQueryChange(event.target.value as string);
          }}
          label="Query"
          sx={{ width: "100%", ml: 2 }}
          disabled={query.field == "" || query.field == null}
        />
      </Stack>
      <Grid container>
        {rows.map(row => {
          return (
            <Grid item key={row.regno} xs={12} md={6} lg={4}>
              <Card sx={{m: 2}}>
                <CardHeader
                  avatar={
                    <Avatar alt={row.name} src={row.image} />
                  }
                  title={row.name}
                  subheader={row.regno}
                />
                <CardContent>
                  <Typography variant="body1">{row.year}</Typography>
                  <Typography variant="caption">{row.department}</Typography>
                  <Typography variant="body2" sx={{mt:1}}>
                    <Link href={"mailto:"+row.email} style={{ color: "inherit", marginTop: 10 }} rel="noreferrer" target="_blank">{row.email}</Link>
                  </Typography>
                </CardContent>
                <CardActions sx={{justifyContent: "space-between"}}>
                  <Box>{row.actions}</Box>
                  <Link href={"/students/"+row.email}><Button size="small">More</Button></Link>
                </CardActions>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  );
}

export default ListProfiles;
