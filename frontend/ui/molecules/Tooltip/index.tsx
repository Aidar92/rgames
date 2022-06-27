import React, { useState } from "react";
import styles from "./Tooltip.module.scss";

type Props = {
  text: React.ReactNode | string;
  children: React.ReactNode;
};

export const Tooltip: React.FC<Props> = ({ text, children }) => {
  const [active, setActive] = useState<boolean>(false);
  return (
    <div
      className={`${styles.tooltip} ${active ? styles.active : ""}`}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <span className={styles.tooltip__text}>{text}</span>
      <div className={styles.tooltip__content}>{children}</div>
    </div>
  );
};
