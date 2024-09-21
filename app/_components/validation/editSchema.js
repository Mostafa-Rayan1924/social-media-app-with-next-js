import * as yup from "yup";
export let editSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  body: yup.string().required("Body is required"),
});
