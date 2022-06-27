import React, { ChangeEventHandler, useCallback, useContext } from "react";
import { AuthContext } from "../../../context";
import { useRouter } from "next/router";
import { locales } from "../../../locales";
import { Locale } from "../../../types";

export const ProfileTab: React.FC = () => {
  const router = useRouter();
  const {
    authState: { userData },
  } = useContext(AuthContext);

  const handleChangeLanguage = useCallback<
    NonNullable<ChangeEventHandler<HTMLSelectElement>>
  >(
    (evt) => {
      router.push(router.asPath, undefined, { locale: evt.target.value });
    },
    [router]
  );

  return (
    <div>
      <p>
        {locales.profile[router.locale!]["Email"]}: {userData?.email}
      </p>
      <p>
        {locales.profile[router.locale!]["Language"]}:
        <select defaultValue={router.locale} onChange={handleChangeLanguage}>
          {Object.entries(Locale).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </p>
    </div>
  );
};
