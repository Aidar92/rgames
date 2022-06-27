import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { MainLayout } from "../../../ui/organisms";
import { Games } from "../../../api";

type Props = {
  game: Games.Model;
};

export const Game: NextPage<Props> = ({ game }) => {
  return (
    <MainLayout>
      <p>{game?.title.ru || game.title.en}</p>
      <p>{game?.description.ru}</p>
    </MainLayout>
  );
};

export default Game;

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const game = await Games.controller.getById(params?.id as string);

  return {
    props: {
      game,
    },
  };
};
