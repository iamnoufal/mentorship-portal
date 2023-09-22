import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import {
  Autocomplete,
  Avatar,
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { UserType } from "@/utils/types";

/**
 * @param data Array<UserType> - Array of users to be displayed
 * @returns React.Component - A table with the data passed in
 * @example
 * <BulkDataGrid data={users} />
 * @see
 * https://mui.com/material-ui/react-table/#sorting-amp-selecting
 * https://mui.com/components/autocomplete/#autocomplete
 * https://mui.com/components/text-fields/#standard-text-field
 */
function BulkDataGrid({ data }: Array<UserType> | any) {
  const initialRows = data;
  const initialColumns = Object.keys(data[0]);

  // page and rows per page for the table
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // rows to be displayed
  const [rows, setRows] = useState<Array<UserType>>(initialRows);
  // query to filter rows
  const [query, setQuery] = useState<{ field: string; value: string }>({
    field: "",
    value: "",
  });

  // function to handle pagination
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // function to handle rows per page when changed
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
      <Paper sx={{ mt: 2 }}>
        <TableContainer sx={{ maxHeight: "70vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {initialColumns!.map((column) => (
                  <TableCell key={column} sx={{ minWidth: (column != "image" && column != "action" && column != "assign" && column != "mentor" && column != "") ? 200 : "auto" }}>
                    {column.toUpperCase()}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows!
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow tabIndex={-1} key={row.regno}>
                      {initialColumns!.map((column) => {
                        return (
                          <TableCell key={column}>
                            {column == "image" ? (
                              <Avatar alt={row.name} src={row[column]} />
                            ) : column == "skills" || column == "hobbies" ? (
                              row[column] && row[column]!.length > 1 ? (
                                row[column]?.join(", ")
                              ) : (
                                "None"
                              )
                            ) : column == "birthday" ||
                              column == "createdAt" ||
                              column == "updatedAt" ? (
                              row[column] ? (
                                new Date(row[column] as Date).toDateString()
                              ) : (
                                "Not set"
                              )
                            ) : (
                              (row[column as keyof UserType] as string) ||
                              "None"
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows!.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default BulkDataGrid;
