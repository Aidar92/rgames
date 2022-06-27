import { ky } from "./kyInstance";

export class ReadRequester<T> {
  readonly url: string;

  constructor(url: string) {
    this.url = url;
  }

  public getAll(): Promise<T[]> {
    return ky.get(this.url).json();
  }

  public getById(id: string): Promise<T> {
    return ky.get(`${this.url}/${id}`).json();
  }
}
