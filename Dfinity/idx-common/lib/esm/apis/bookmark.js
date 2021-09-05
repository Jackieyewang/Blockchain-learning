var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* eslint-disable prefer-const */
/* eslint-disable guard-for-in */
import { TileDocument } from '@ceramicnetwork/stream-tile';
import { schemas } from '../constants';
import { DefaultCollectionKeys, IDXAliases } from '../constants/enums';
import { getCollectionByKey, getCollections } from './collection';
export function createBookmark(idx, bookmarkToAdd) {
    return __awaiter(this, void 0, void 0, function* () {
        const did = idx.id;
        const { id } = yield TileDocument.create(idx.ceramic, bookmarkToAdd, {
            schema: schemas.Bookmark,
            controllers: [did],
            tags: ['bookmarks'],
        });
        console.log(id.toUrl());
        return id.toUrl();
    });
}
export function getBookmark(idx, docID) {
    return __awaiter(this, void 0, void 0, function* () {
        const doc = yield idx.ceramic.loadStream(docID);
        return doc.state.content;
    });
}
// export async function updateBookmark(
//   idx: IDX,
//   bookmarkToAdd: Bookmark
// ): Promise<string> {
// }
// export async function deleteBookmark(
//   idx: IDX,
//   bookmarkToAdd: Bookmark
// ): Promise<string> {
// }
export function addBookmarkToCollection(idx, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const { bookmarkToAdd, collectionKey = DefaultCollectionKeys.DEFI } = params;
        const collections = yield getCollections(idx);
        if (!collections) {
            throw new Error(`Collections are not initialized in your metaverse`);
        }
        const bookmarkID = yield createBookmark(idx, bookmarkToAdd);
        const collectionForKey = collections[collectionKey];
        let updatedCollection;
        updatedCollection = !Array.isArray(collectionForKey)
            ? [bookmarkID]
            : [bookmarkID, ...collectionForKey];
        const newCollections = Object.assign(Object.assign({}, collections), { [collectionKey]: updatedCollection });
        const collectionsID = yield idx.set(IDXAliases.COLLECTIONS, newCollections);
        return collectionsID.toUrl();
    });
}
// export async function addBookmarksToCollection(
//   idx: IDX,
//   params: {
//     bookmarkDocId: string;
//     CollectionKey?: string;
//   }
// ): Promise<string> {
// }
export function getBookmarksFromCollection(idx, collectionKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const collectionForKey = yield getCollectionByKey(idx, { key: collectionKey });
        if (!collectionForKey) {
            return [];
        }
        const bookmarkSet = [];
        for (const bookmarkID of collectionForKey) {
            bookmarkSet.push(yield getBookmark(idx, bookmarkID));
        }
        return bookmarkSet;
    });
}
export function getAllBookmarks(idx) {
    return __awaiter(this, void 0, void 0, function* () {
        const collections = yield getCollections(idx);
        if (!collections) {
            return {};
        }
        const allBookmarks = {};
        for (const key in collections) {
            const collectionForKey = collections[key];
            const bookmarkSet = [];
            for (const bookmarkID of collectionForKey) {
                bookmarkSet.push(yield getBookmark(idx, bookmarkID));
            }
            allBookmarks[key] = bookmarkSet;
        }
        return allBookmarks;
    });
}
// export async function removeBookmarksFromCollection(
//   idx: IDX,
//   params: {
//     bookmarkDocId: string;
//     CollectionKey?: string;
//   }
// ): Promise<string> {
// }
