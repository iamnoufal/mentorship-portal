import { Dispatch, SetStateAction } from "react";

// ALL TYPES USED IN THIS PROJECT ARE DEFINED HERE
// IF YOU ARE ADDING A NEW TYPE, PLEASE ADD IT TO THE BOTTOM OF THE LIST
// IF YOU WANT TO INCLUDE ANY DATA IN A TYPE, ADD IT TO THE RESPECTIVE TYPE

// user data type (object)
export type UserType = {
  regno: string;
  name: string;
  email: string;
  year: string;
  birthday?: Date;
  department: string;
  image?: string | any;
  skills?: Array<string>;
  hobbies?: Array<string>;
  type: string;
  createdAt?: Date;
  updatedAt?: Date;
  mentor?: UserType;
  assignedFeedbacks?: ResponseType[];
  mentees?: Array<UserType>;
};

// type created for user state
export type AppContextType = {
  user: UserType;
  loading: boolean;
  setUser: Dispatch<SetStateAction<UserType>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  theme: "light" | "dark";
  setTheme: Dispatch<SetStateAction<"light" | "dark">>;
};

// return type of import excel
export type ImportExcelType = {
  headers: Array<any>;
  data: Array<any>;
};

// type for throwing errors fron api
export type Response = {
  message?: string | string[];
  code: number;
  link?: string | string[];
};

// type for form
export interface FormType {
  formID?: string | string[];
  createdBy?: string;
  admin?: UserType;
  title?: string;
  description?: string;
  fields: Array<{ label: string; type: string }>;
  feedbacks?: Array<ResponseType>;
  assignedTo?: Array<AssignedFeedbacksType>;
  createdAt?: Date;
  [key: string]: any;
}

// feedback type
export interface ResponseType {
  formID?: string | string[];
  regno?: string;
  user?: UserType;
  values: Array<{ fieldID: string; value: string | number }>;
  [key: string]: any;
}

interface AssignedFeedbacksType {
  form: FormType;
  user: UserType;
  [key: string]: any;
}
