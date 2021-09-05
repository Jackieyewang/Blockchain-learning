import { CeramicDoc } from "../typings";

export class Bookmark {
  type = '';
  url = '';
  title = '';
  description = '';
  tags: string[] = [''];
  collections: string[] = [''];
  date = new Date().toISOString();
  tokenId = '';
  contract = '';
  owner = '';
  image = '';
}

export type BookmarkDoc = CeramicDoc<Bookmark>;
