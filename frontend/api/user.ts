import { ReadRequester } from "../lib";

const URL = "/api/users";

export namespace User {
  export type Role = {
    value: string;
    description: string;
  };

  export type Model = {
    locale: string;
    email: string;
    roles: Role[];
  };

  export const controller = new ReadRequester<Model>(URL);
}
