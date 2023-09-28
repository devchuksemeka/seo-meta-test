import styles from "./label.module.scss";

interface LabelProps {
  children: any;
}
const Label = ({ children, ...rest }: LabelProps) => {
  return (
    <label role='label' className={styles.label_default} {...rest}>
      {children}
    </label>
  );
};

export default Label;
