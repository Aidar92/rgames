import React, { useState } from "react";
import styles from "./slider.module.scss";
import Image from "next/image";
import { imageLoader } from "../../../lib";
import { Games } from "../../../api";
import { useRouter } from "next/router";

export type Props = {
  tabs: Games.Model[];
};

export const Slider: React.FC<Props> = ({ tabs = [] }) => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const tabClickHandle = (index) => () => {
    setTabIndex(index);
  };

  const router = useRouter();

  return (
    <div className={styles.slider}>
      <div className={styles.slider__tabs__content}>
        {tabs[tabIndex] && (
          <div className={styles.slider__tabs__content__caption}>
            <Image
              alt={tabs[tabIndex]?.title.en}
              loader={imageLoader}
              src={tabs[tabIndex]?.image}
              layout="fill"
              onClick={() => router.push(`/shop/games/${tabs[tabIndex]._id}`)}
            />
          </div>
        )}
      </div>
      <div className={styles.slider__tabs}>
        {tabs.map(({ title, image }, index) => (
          <button
            className={`${styles.slider__tabs__item} ${
              index === tabIndex ? styles.slider__tabs__item__active : ""
            }`}
            value={index}
            onClick={tabClickHandle(index)}
            key={index}
          >
            <span className={styles.slider__tabs__item__title}>{title.en}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
