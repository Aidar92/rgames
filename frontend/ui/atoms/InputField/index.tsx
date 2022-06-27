import React, { InputHTMLAttributes } from "react";
import styles from "./inputfield.module.scss";

export interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export const InputField: React.FC<IProps> = ({
  name,
  label,
  ...inputProps
}) => {
  return (
    <div className={styles["input-wrapper"]}>
      <label className={styles["input-wrapper__label"]} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={styles["input-wrapper__input"]}
        placeholder={label}
        {...inputProps}
      />
    </div>
  );
};
