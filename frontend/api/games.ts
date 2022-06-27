import { Locale } from "../types";
import { CrudRequester } from "../lib";

const URL = "api/games";

export namespace Games {
  export type Genre = {
    _id: string;
    name: string;
  };

  export type Model = {
    _id: string;
    title: { [key in Locale]: string };
    description: { [key in Locale]: string };
    image: string;
    genres: Genre[];
    rating: number;
  };

  export const controller = new CrudRequester<Model>(URL);
}
