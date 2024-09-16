import * as yup from "yup";
export let loginSchema = yup.object().shape({
  username: yup.string().min(3, "Enter your username").required(),
  password: yup
    .string()
    .min(6, "Must be 6 characters at least")
    .required("Enter your username"),
});
