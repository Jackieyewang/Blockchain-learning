"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBookmarks = exports.getBookmarksFromCollection = exports.addBookmarkToCollection = exports.getBookmark = exports.createBookmark = void 0;
/* eslint-disable prefer-const */
/* eslint-disable guard-for-in */
const stream_tile_1 = require("@ceramicnetwork/stream-tile");
const constants_1 = require("../constants");
const enums_1 = require("../constants/enums");
const collection_1 = require("./collection");
function createBookmark(idx, bookmarkToAdd) {
    return __awaiter(this, void 0, void 0, function* () {
        const did = idx.id;
        const { id } = yield stream_tile_1.TileDocument.create(idx.ceramic, bookmarkToAdd, {
            schema: constants_1.schemas.Bookmark,
            controllers: [did],
            tags: ['bookmarks'],
        });
        console.log(id.toUrl());
        return id.toUrl();
    });
}
exports.createBookmark = createBookmark;
function getBookmark(idx, docID) {
    return __awaiter(this, void 0, void 0, function* () {
        const doc = yield idx.ceramic.loadStream(docID);
        return doc.state.content;
    });
}
exports.getBookmark = getBookmark;
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
function addBookmarkToCollection(idx, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const { bookmarkToAdd, collectionKey = enums_1.DefaultCollectionKeys.DEFI } = params;
        const collections = yield collection_1.getCollections(idx);
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
        const collectionsID = yield idx.set(enums_1.IDXAliases.COLLECTIONS, newCollections);
        return collectionsID.toUrl();
    });
}
exports.addBookmarkToCollection = addBookmarkToCollection;
// export async function addBookmarksToCollection(
//   idx: IDX,
//   params: {
//     bookmarkDocId: string;
//     CollectionKey?: string;
//   }
// ): Promise<string> {
// }
function getBookmarksFromCollection(idx, collectionKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const collectionForKey = yield collection_1.getCollectionByKey(idx, { key: collectionKey });
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
exports.getBookmarksFromCollection = getBookmarksFromCollection;
function getAllBookmarks(idx) {
    return __awaiter(this, void 0, void 0, function* () {
        const collections = yield collection_1.getCollections(idx);
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
exports.getAllBookmarks = getAllBookmarks;
// export async function removeBookmarksFromCollection(
//   idx: IDX,
//   params: {
//     bookmarkDocId: string;
//     CollectionKey?: string;
//   }
// ): Promise<string> {
// }
