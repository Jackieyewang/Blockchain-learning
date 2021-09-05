import { CeramicDoc } from "../typings";
export declare class Bookmark {
    type: string;
    url: string;
    title: string;
    description: string;
    tags: string[];
    collections: string[];
    date: string;
    tokenId: string;
    contract: string;
    owner: string;
    image: string;
}
export declare type BookmarkDoc = CeramicDoc<Bookmark>;
