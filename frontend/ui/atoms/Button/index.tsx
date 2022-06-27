import React, { ButtonHTMLAttributes } from "react";
import styles from "./button.module.scss";

export const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...buttonProps
}) => {
  return (
    <button className={[styles.button, className].join(" ")} {...buttonProps}>
      {children}
    </button>
  );
};
