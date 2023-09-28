import styles from "./input.module.scss";

export interface InputProps {
  fullWidth?: boolean;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (event: any) => void;
  type?: string;
}
const Input = ({ fullWidth, ...rest }: InputProps) => {
  let style = styles.input_default;

  if (fullWidth) {
    style = `${style} ${styles.input_fullwidth}`;
  }
  return <input className={style} {...rest} />;
};

export default Input;
