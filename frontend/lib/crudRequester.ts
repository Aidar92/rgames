import { ReadRequester } from "./readRequester";
import { ResponsePromise } from "ky";
import { ky } from "./kyInstance";

export class CrudRequester<T> extends ReadRequester<T> {
  public create(values: Partial<T>): ResponsePromise {
    return ky.post(this.url, { json: values });
  }

  public update(id: string, values: Partial<T>): ResponsePromise {
    return ky.patch(`${this.url}/${id}`, { json: values });
  }
}
