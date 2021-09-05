import { CeramicDoc } from "../typings";

export type BasicProfile = {
  name: string;
  description: string;
  image: string;
};

export type BasicProfileDoc = CeramicDoc<BasicProfile>;
