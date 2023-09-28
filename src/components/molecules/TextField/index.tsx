import Input, { InputProps } from "@/components/atoms/Input";
import styles from "./textfield.module.scss";
import { FieldInputProps, FieldMetaState } from "react-final-form";

interface TextFieldProps extends InputProps {
  fullWidth?: boolean;
  placeholder?: string;
  required?: boolean;
  type?: "search" | "password" | "email" | "text" | "number";
  label?: string | JSX.Element;
  labelPosition?: "top" | "bottom";
  input?: FieldInputProps<any, HTMLElement>;
  meta?: FieldMetaState<any>;
}

const TextField = ({
  label,
  labelPosition = "top",
  ...rest
}: TextFieldProps) => {
  const { input, meta } = rest;
  const { touched, error } = meta ?? {};
  const showError = touched && !!error;

  return (
    <div className={styles.wrapper}>
      {labelPosition === "top" && label ? label : null}
      <Input
        fullWidth
        value={input?.value}
        onChange={input?.onChange}
        {...rest}
      />
      {labelPosition === "bottom" && label ? label : null}
    </div>
  );
};

export default TextField;
