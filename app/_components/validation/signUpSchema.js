import * as yup from "yup";
export let signUpSchema = yup.object().shape({
  username: yup.string().min(3, "Enter your username").required(),
  password: yup
    .string()
    .min(6, "Must be 6 characters at least")
    .required("password is required"),
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
  name: yup.string().min(3, "Enter your real name").required(),
  image: yup.string().required(),
});
