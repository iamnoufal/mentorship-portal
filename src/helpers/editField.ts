import { ResponseType, FormType, UserType } from "@/utils/types";
import { Dispatch, SetStateAction } from "react";

/**
 * @description Edit a field in a form
 * @param key keyof UserType | keyof ResponseType | keyof FormType - The key of the field to edit
 * @param value any - The value to set the field to
 * @param action Dispatch<SetStateAction<UserType>> | Dispatch<SetStateAction<FormType>> | Dispatch<SetStateAction<ResponseType>> - The action to perform on the field
 * @returns void
 * @example
 * editField("name", "John Doe", setName);
 * @see
 * https://www.typescriptlang.org/docs/handbook/utility-types.html#keyof-type-operators
 * https://www.typescriptlang.org/docs/handbook/basic-types.html#any
 * https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-exports
 * https://www.typescriptlang.org/docs/handbook/utility-types.html#setstateactiontype
 */
function editField(
  key: keyof UserType | keyof ResponseType | keyof FormType,
  value: any,
  action:
    | Dispatch<SetStateAction<UserType>>
    | Dispatch<SetStateAction<FormType>>
    | Dispatch<SetStateAction<ResponseType>>
): void {
  action((prevState: any) => ({
    ...prevState,
    [key]: value,
  }));
}

export default editField;
