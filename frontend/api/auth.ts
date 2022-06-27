import { ky } from "../lib/kyInstance";
import { Locale } from "../types";

const URL = "auth";

export namespace Auth {
  export type LoginParams = {
    email: string;
    password: string;
  };

  type Genre = {
    _id: string;
    name: string;
  };

  type Game = {
    _id: string;
    title: { [key in Locale]: string };
    description: { [key in Locale]: string };
    image: string;
    genres: Genre[];
    rating: number;
  };

  class Controller {
    readonly url: string;

    constructor(url: string) {
      this.url = url;
    }

    public login(values: LoginParams): Promise<{
      token: string;
    }> {
      return ky
        .post(`${this.url}/login`, {
          json: values,
        })
        .json();
    }

    public signup(values: LoginParams): Promise<{
      token: string;
    }> {
      return ky
        .post(`${this.url}/signup`, {
          json: values,
        })
        .json();
    }

    public getUserGames(): Promise<{
      games: Game[];
    }> {
      return ky.get(`${this.url}/games`).json();
    }
  }

  export const controller = new Controller(URL);
}
