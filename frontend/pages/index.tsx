import type { GetStaticProps, NextPage } from "next";
import { MainLayout } from "../ui/organisms";
import { Slider } from "../ui/molecules";
import { Games } from "../api";

export type HomeProps = {
  games: Games.Model[];
  context: any;
};

const Home: NextPage<HomeProps> = ({ games = [] }) => {
  return (
    <MainLayout>
      <Slider tabs={games} />
    </MainLayout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const games = await Games.controller.getAll();
    return {
      props: {
        games,
      },
    };
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      games: [],
    },
  };
};
