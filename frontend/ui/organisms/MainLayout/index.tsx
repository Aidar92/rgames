import React from "react";
import { Navbar } from "../../molecules";
import Head from "next/head";
import styles from "./MainLayout.module.scss";

type MainLayoutProps = {
  title?: string;
  description?: string;
  keywords?: string;
  children: React.ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Games store</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/frontend/public/favicon.ico" />
      </Head>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.main}>{children}</div>
      </div>
      <footer className={styles.footer}></footer>
    </>
  );
};