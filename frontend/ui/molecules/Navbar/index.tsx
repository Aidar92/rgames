import React, { useEffect, useMemo } from "react";
import styles from "./navbar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faBars, faLanguage } from "@fortawesome/free-solid-svg-icons";
import setLanguage from "next-translate/setLanguage";
import Link from "next/link";
import { useRouter } from "next/router";
import { locales } from "../../../locales";
import { Tooltip } from "../Tooltip";

export const Navbar: React.FC = (props) => {
  const { locale } = useRouter();

  const menuItems = useMemo(
    () =>
      locale
        ? [
            { text: locales.navbar[locale]["Shop"], href: "/shop" },
            { text: locales.navbar[locale]["News"], href: "/news" },
            { text: locales.navbar[locale]["FAQ"]!, href: "/faq" },
          ]
        : [],
    [locale]
  );

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__logo}>
        <Link href="/">RGames</Link>
      </div>
      <ul className={styles.navbar__links}>
        <input
          className={styles.navbar__links__checkbox_toggle}
          type="checkbox"
          id="checkbox_toggle"
        />
        <label
          htmlFor="checkbox_toggle"
          className={styles.navbar__links__hamburger}
        >
          <FontAwesomeIcon icon={faBars} />
        </label>
        <div className={styles.navbar__menu}>
          {menuItems.map(({ href, text }) => (
            <li key={href} className={styles.navbar__menu__item}>
              <Link href={href}>{text}</Link>
            </li>
          ))}
          <hr className={styles.navbar__menu__break} />
          <li
            title={locales.navbar[locale!]["Profile"]}
            className={styles.navbar__menu__item}
          >
            <Link href="/profile">
              <FontAwesomeIcon className={styles.icon} icon={faUser} />
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};
