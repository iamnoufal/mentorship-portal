import { FormType } from "@/utils/types";
import {
  Typography,
  List,
  Paper,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";

/**
 * 
 * @param data Array<FormType> - Array of forms to be displayed
 * @returns React.Component - A list of forms with the data passed in
 * @example
 * <FormList data={forms} />
 * @see
 * https://mui.com/components/lists/
 */
function FormList({ data }: any) {
  return (
    <Box sx={{ width: "100%" }}>
      {data.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            my: 20,
          }}
        >
          <Typography>No forms forms assigned for you</Typography>
        </Box>
      ) : (
        <List>
          {data.map((form: FormType) => {
            return (
              <motion.div
                initial={{ y: 80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
                key={form.formID as any}
              >
                <Paper elevation={4} sx={{ p: 0, mb: 2 }}>
                  <ListItem disablePadding>
                    <Link
                      href={`${window.location.href}/${form.formID}`}
                      style={{
                        color: "inherit",
                        textDecoration: "none",
                        width: "100%",
                      }}
                    >
                      <ListItemButton
                        sx={{
                          color: "inherit",
                          textDecoration: "none",
                          px: 2,
                          flexDirection: "column",
                          alignItems: "start",
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography
                              variant="h6"
                              className="lora"
                              sx={{ mb: 1 }}
                            >
                              {form.title}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body2" className="ms">
                              {form.description}
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                </Paper>
              </motion.div>
            );
          })}
        </List>
      )}
    </Box>
  );
}

export default FormList;
