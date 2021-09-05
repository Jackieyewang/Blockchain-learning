import { CeramicDoc } from "../typings";

export type Collections = {
  unsorted: string[];
  public: string[];
  private: string[];
  trash: string[];
  [key: string]: string[];
};

export type CollectionsDoc = CeramicDoc<Collections>;
