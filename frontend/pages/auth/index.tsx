import React, { useCallback, useContext } from "react";
import { MainLayout } from "../../ui/organisms";
import { AuthContext } from "../../context";
import { Button, InputField } from "../../ui/atoms";
import Link from "next/link";
import styles from "../../styles/Auth.module.scss";
import { GetStaticProps } from "next";
import { locales } from "../../locales";

type Props = {
  locale: string;
  defaultLocale: string;
};

const Auth: React.FC<Props> = ({ locale }) => {
  const { logIn } = useContext(AuthContext);

  const handleSubmit = useCallback(
    (evt: React.SyntheticEvent) => {
      evt.preventDefault();
      const target = evt.target as typeof evt.target & {
        email: { value: string };
        password: { value: string };
      };

      logIn({
        email: target.email.value,
        password: target.password.value,
      });
    },
    [logIn]
  );

  return (
    <MainLayout>
      <form className={styles["auth-form"]} onSubmit={handleSubmit}>
        <InputField
          label={locales.auth[locale]["Email"]}
          name="email"
          type="email"
        />
        <InputField
          label={locales.auth[locale]["Password"]}
          name="password"
          type="password"
        />
        <Button type="submit">{locales.auth[locale]["Sign in"]}</Button>
        <div className={styles["auth-form-buttons"]}>
          <Link href="/signup">{locales.auth[locale]["Forgot password"]}</Link>
          <Link href="/signup">{locales.auth[locale]["Sign up"]}</Link>
        </div>
      </form>
    </MainLayout>
  );
};

export default Auth;

export const getStaticProps: GetStaticProps = (context) => {
  return {
    props: context,
  };
};
