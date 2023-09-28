import Input, { InputProps } from "@/components/atoms/Input";
import styles from "./textfield.module.scss";
import { FieldInputProps, FieldMetaState } from "react-final-form";
import Select, { GroupBase, OptionsOrGroups } from "react-select";

interface SelectFieldProps extends InputProps {
  fullWidth?: boolean;
  placeholder?: string;
  required?: boolean;
  type?: "search" | "password" | "email" | "text" | "number";
  label?: string;
  labelPosition?: "top" | "bottom";
  input?: FieldInputProps<any, HTMLElement>;
  meta?: FieldMetaState<any>;
  isClearable?: boolean;
  isSearchable?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  options: any[];
  // options: {value: string, label: string}[] | GroupBase<string>[] | OptionsOrGroups<string, GroupBase<string>> | undefined;
}

const SelectField = ({
  label,
  labelPosition = "top",
  ...rest
}: SelectFieldProps) => {
  const { input, meta } = rest;
  const { touched, error } = meta ?? {};
  const showError = touched && !!error;

  return (
    <div className={styles.wrapper}>
      {labelPosition === "top" && label ? label : null}
      <Select
        fullWidth
        classNamePrefix='select'
        className={styles.select}
        onChange={input?.onChange}
        value={input?.value}
        {...rest}
      />
      {labelPosition === "bottom" && label ? label : null}
    </div>
  );
};

export default SelectField;
