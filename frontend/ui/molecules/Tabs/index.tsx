import React, { useState } from "react";
import styles from "./Tabs.module.scss";

export type TabsOptions = {
  tabs: {
    name: string;
    children: React.ReactNode;
  }[];
};

export const Tabs: React.FC<TabsOptions> = ({ tabs }) => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleClick = (index: number) => () => {
    setTabIndex(index);
  };
  return (
    <div className={styles["tabs-wrapper"]}>
      <div className={styles["tabs-wrapper__links"]}>
        {tabs.map(({ name }, index) => (
          <button
            key={name}
            className={[
              tabIndex === index ? styles.active : "",
              styles["tabs-wrapper__links__btn"],
            ].join(" ")}
            onClick={handleClick(index)}
          >
            {name}
          </button>
        ))}
      </div>
      <div className={styles["tabs-wrapper__content"]}>
        {tabs[tabIndex].children}
      </div>
    </div>
  );
};
