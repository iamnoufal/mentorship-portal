import editField from "@/helpers/editField";
import type { ResponseType, FormType, UserType } from "@/utils/types";
import { TextField, Box, Typography, Container, Rating } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

/**
 *
 * @param response ResponseType - The response object to be displayed
 * @param form FormType - The form object to be displayed
 * @param action Dispatch<SetStateAction<UserType>> | Dispatch<SetStateAction<FormType>> | Dispatch<SetStateAction<ResponseType>> - The action to be triggered when a field is edited
 * @param disabled boolean - Whether the form is disabled or not. false by default
 * @returns React.Component - A form with the data passed in
 * @example
 * <Form response={response} form={form} action={setResponse} />
 * <Form response={response} form={form} action={setResponse} disabled />
 * @see
 * https://mui.com/components/text-fields/#multiline
 * https://mui.com/components/rating/#custom-icons
 */
function Form({
  response,
  form,
  action,
  disabled,
}: {
  response: ResponseType;
  form: FormType;
  action:
    | Dispatch<SetStateAction<UserType>>
    | Dispatch<SetStateAction<FormType>>
    | Dispatch<SetStateAction<ResponseType>>;
  disabled?: boolean;
}) {
  return (
    <Container maxWidth="lg">
      {form.fields.map((field, index) => {
        return (
          <Box sx={{ my: 2 }} key={field.label}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {field.label}
            </Typography>
            {field.type === "text" ? (
              <TextField
                sx={{ width: "100%" }}
                value={response.values[index].value || ""}
                multiline
                rows={2}
                onChange={(e) =>
                  editField(
                    "values",
                    response.values.map(
                      (f: { value: string | number }, i: number) => {
                        if (i == index) {
                          return { ...f, value: e.target.value };
                        } else return f;
                      }
                    ),
                    action
                  )
                }
                disabled={disabled || false}
              />
            ) : (
              <Rating
                name={field.label}
                value={Number(response.values[index].value) || 0}
                onChange={(e, v) =>
                  editField(
                    "values",
                    response.values.map(
                      (f: { value: string | number }, i: number) => {
                        if (i == index) {
                          return { ...f, value: v };
                        } else return f;
                      }
                    ),
                    action
                  )
                }
                max={10}
                disabled={disabled || false}
                size="large"
                icon={
                  <StarRoundedIcon
                    fontSize="large"
                    sx={{ color: "text.primary", opacity: 0.7 }}
                  />
                }
                emptyIcon={
                  <StarOutlineRoundedIcon
                    fontSize="large"
                    sx={{ color: "text.primary", opacity: 0.4 }}
                  />
                }
              />
            )}
          </Box>
        );
      })}
    </Container>
  );
}

export default Form;
