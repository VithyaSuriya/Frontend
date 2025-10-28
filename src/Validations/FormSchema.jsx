import * as yup from "yup";

export const formSchema = yup.object().shape({
  title: yup.string().min(5, "Min 5 characters").required(),
  description: yup.string().min(20).max(200).required(),
  type: yup.string().required(),
  deadline: yup
    .date()
    .typeError("Deadline is required")
    .min(new Date(), "Must be a future date")
    .required("Deadline is required"),

  priority: yup.string().required(),
  email: yup.string().email().required(),
  apiEndpoint: yup.string().when("type", {
    is: "API Integration",
    then: (schema) =>
      schema
        .required("Api endpoint required")
        .matches(/^https?:\/\//, "Must start with http or https"),
  }),
});
