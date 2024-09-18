import * as yup from "yup";
export let addComment = yup.object().shape({
  body: yup.string().required("Body is required"),
});
