const Error = ({ formik, nameOfField }) => {
  return (
    <p className="text-[12px] italic text-red-500">
      {formik.touched[nameOfField] && formik.errors[nameOfField]
        ? formik.errors[nameOfField]
        : null}
    </p>
  );
};

export default Error;
