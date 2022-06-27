import React, { useCallback, useContext } from "react";
import { MainLayout } from "../../ui/organisms";
import { AuthContext } from "../../context";
import { Button, InputField } from "../../ui/atoms";
import Link from "next/link";
import styles from "../../styles/Auth.module.scss";
import { useRouter } from "next/router";
import { locales } from "../../locales";

const Signup: React.FC = () => {
  const { signup } = useContext(AuthContext);

  const router = useRouter();

  const handleSubmit = useCallback(
    (evt: React.SyntheticEvent) => {
      evt.preventDefault();
      const target = evt.target as typeof evt.target & {
        email: { value: string };
        password: { value: string };
      };

      signup({
        email: target.email.value,
        password: target.password.value,
      });
    },
    [signup]
  );
  return (
    <MainLayout>
      <form className={styles["auth-form"]} onSubmit={handleSubmit}>
        <InputField
          label={locales.signup[router.locale!]["Email"]}
          name="email"
          type="email"
        />
        <InputField
          label={locales.signup[router.locale!]["Password"]}
          name="password"
          type="password"
        />
        <Button type="submit">
          {locales.signup[router.locale!]["Sign up"]}
        </Button>
        <div className={styles["auth-form-buttons"]}>
          <Link href="/auth">{locales.signup[router.locale!]["Sign in"]}</Link>
        </div>
      </form>
    </MainLayout>
  );
};

export default Signup;
