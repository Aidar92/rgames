import { ReadRequester } from "../lib";

const URL = "api/genres";

export namespace Genres {
  export type Model = {
    id: string;
    name: string;
  };

  export const controller = new ReadRequester<Model>(URL);
}
