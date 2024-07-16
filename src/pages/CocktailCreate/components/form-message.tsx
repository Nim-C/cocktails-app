import React, { PropsWithChildren } from "react";

type FormMessageProps = PropsWithChildren & {
  variant: "field-validation" | "submission-status";
};

const FormMessage: React.FC<FormMessageProps> = ({
  children: message,
  variant,
}) => {
  return <div className={`${variant}-message`}>{message}</div>;
};

export default FormMessage;
