import React, { useContext, useEffect, useMemo } from "react";
import { NextPage } from "next";
import { MainLayout } from "../../ui/organisms";
import { useRouter } from "next/router";
import { AuthContext } from "../../context";
import { Tabs, TabsOptions } from "../../ui/molecules/Tabs";
import { locales } from "../../locales";
import { MyGamesTab, ProfileTab } from "../../components/profile";

const Profile: NextPage = () => {
  const {
    authState: { authInProgress, isAuthorized, userData },
  } = useContext(AuthContext);

  const router = useRouter();

  const tabs: TabsOptions["tabs"] = useMemo(
    () => [
      {
        name: locales.profile[router.locale!]["Profile"],
        children: <ProfileTab />,
      },
      {
        name: locales.profile[router.locale!]["My games"],
        children: <MyGamesTab />,
      },
    ],
    [router.locale]
  );

  useEffect(() => {
    if (!authInProgress && !isAuthorized) router.push("/auth");
  }, [authInProgress, isAuthorized, router]);

  return (
    <MainLayout>
      <Tabs tabs={tabs} />
    </MainLayout>
  );
};

export default Profile;
