/* eslint-disable prefer-const */
/* eslint-disable guard-for-in */
import { TileDocument } from '@ceramicnetwork/stream-tile';
import { IDX } from '@ceramicstudio/idx';

import { schemas } from '../constants';
import { DefaultCollectionKeys, IDXAliases } from '../constants/enums';
import { Bookmark } from '../models';
import { getCollectionByKey, getCollections } from './collection';

export async function createBookmark(idx: IDX, bookmarkToAdd: Bookmark): Promise<string> {
  const did = idx.id;
  const { id } = await TileDocument.create(idx.ceramic, bookmarkToAdd, {
    schema: schemas.Bookmark,
    controllers: [did],
    tags: ['bookmarks'],
  });
  console.log(id.toUrl());
  return id.toUrl();
}

export async function getBookmark(idx: IDX, docID: string): Promise<Bookmark> {
  const doc = await idx.ceramic.loadStream(docID);
  return doc.state.content;
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

export async function addBookmarkToCollection(
  idx: IDX,
  params: {
    bookmarkToAdd: Bookmark;
    collectionKey: string | undefined;
  },
): Promise<string> {
  const { bookmarkToAdd, collectionKey = DefaultCollectionKeys.DEFI } = params;

  const collections = await getCollections(idx);
  if (!collections) {
    throw new Error(`Collections are not initialized in your metaverse`);
  }

  const bookmarkID = await createBookmark(idx, bookmarkToAdd);
  const collectionForKey = collections[collectionKey];
  let updatedCollection;

  updatedCollection = !Array.isArray(collectionForKey)
    ? [bookmarkID]
    : [bookmarkID, ...collectionForKey];

  const newCollections = {
    ...collections,
    [collectionKey]: updatedCollection,
  };
  const collectionsID = await idx.set(IDXAliases.COLLECTIONS, newCollections);

  return collectionsID.toUrl();
}

// export async function addBookmarksToCollection(
//   idx: IDX,
//   params: {
//     bookmarkDocId: string;
//     CollectionKey?: string;
//   }
// ): Promise<string> {
// }

export async function getBookmarksFromCollection(
  idx: IDX,
  collectionKey: string,
): Promise<Bookmark[]> {
  const collectionForKey = await getCollectionByKey(idx, { key: collectionKey });
  if (!collectionForKey) {
    return [];
  }

  const bookmarkSet: Bookmark[] = [];
  for (const bookmarkID of collectionForKey) {
    bookmarkSet.push(await getBookmark(idx, bookmarkID));
  }
  return bookmarkSet;
}

export async function getAllBookmarks(idx: IDX): Promise<{ [key: string]: Bookmark[] }> {
  const collections = await getCollections(idx);

  if (!collections) {
    return {};
  }

  const allBookmarks: { [key: string]: Bookmark[] } = {};

  for (const key in collections) {
    const collectionForKey = collections[key];
    const bookmarkSet: Bookmark[] = [];

    for (const bookmarkID of collectionForKey) {
      bookmarkSet.push(await getBookmark(idx, bookmarkID));
    }
    allBookmarks[key] = bookmarkSet;
  }

  return allBookmarks;
}

// export async function removeBookmarksFromCollection(
//   idx: IDX,
//   params: {
//     bookmarkDocId: string;
//     CollectionKey?: string;
//   }
// ): Promise<string> {
// }
