import { IDX } from '@ceramicstudio/idx';
import { Bookmark } from '../models';
export declare function createBookmark(idx: IDX, bookmarkToAdd: Bookmark): Promise<string>;
export declare function getBookmark(idx: IDX, docID: string): Promise<Bookmark>;
export declare function addBookmarkToCollection(idx: IDX, params: {
    bookmarkToAdd: Bookmark;
    collectionKey: string | undefined;
}): Promise<string>;
export declare function getBookmarksFromCollection(idx: IDX, collectionKey: string): Promise<Bookmark[]>;
export declare function getAllBookmarks(idx: IDX): Promise<{
    [key: string]: Bookmark[];
}>;
