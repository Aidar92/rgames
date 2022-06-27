import React from "react";
import { useQuery } from "react-query";
import { Auth } from "../../../api";

export const MyGamesTab: React.FC = () => {
  const { data, error } = useQuery("games", () => {
    return Auth.controller.getUserGames();
  });

  return (
    <div>
      {data &&
        data.games.map(({ _id, title }) => (
          <div key={`game_${_id}`}>
            <p>title</p>
          </div>
        ))}
    </div>
  );
};
