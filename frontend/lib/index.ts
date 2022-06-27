import { ImageLoader } from "next/image";

const BASE_URL = "http://localhost:7000";

export const imageLoader: ImageLoader = ({ src, width }) => {
  const relativeSrc = (src) => src.split("/").pop();

  return `${BASE_URL}/${relativeSrc(src)}`;
};

export { CrudRequester } from "./crudRequester";

export { ReadRequester } from "./readRequester";

export { parseJwt } from "./parseJwt";
