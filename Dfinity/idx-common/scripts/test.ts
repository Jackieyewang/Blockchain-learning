import type { CeramicApi } from '@ceramicnetwork/common';
import type { IDX } from '@ceramicstudio/idx';
import { ethers } from 'ethers';

import { apis, BasicProfile, Bookmark, enums } from '../src';

let ceramic: CeramicApi;
let idx: IDX;

export async function initialize() {
  ceramic = apis.ceramic.createCeramic('http://localhost:7007');
  const seed = ethers.utils.arrayify('0x00000000000000000000000000000002');
  const didProvider = await apis.threeId.createThreeIdFromSeed({ ceramic, seed });
  idx = apis.idx.createIDX(ceramic);
  await apis.threeId.authenticate({ ceramic, didProvider });
}

export async function setProfile(profile: BasicProfile) {
  return apis.profile.setBasicProfileDocContent(idx, profile);
}

export async function getProfile(did?: string) {
  return apis.profile.getBasicProfileDocContent(idx, did);
}

export async function initCollections(did?: string) {
  const isCollectionInit = await apis.collection.hasCollections(idx, did);
  if (!isCollectionInit) {
    await apis.collection.initCollections(idx);
  }
}

export async function addBookmark(bookmark: Bookmark, key?: string): Promise<string> {
  return apis.bookmark.addBookmarkToCollection(idx, {
    bookmarkToAdd: bookmark,
    collectionKey: key,
  });
}

export async function getBookmarks(key: string): Promise<Bookmark[]> {
  return apis.bookmark.getBookmarksFromCollection(idx, key);
}

export async function getAllBookmarks(): Promise<{ [key: string]: Bookmark[] }> {
  return apis.bookmark.getAllBookmarks(idx);
}

export async function getCollectionNames(did?: string): Promise<string[]> {
    return apis.collection.getCollectionNames(idx, did);
}

async function main() {
  await initialize();

  console.log(idx.id);

  await initCollections();

  // const profile: BasicProfile = {
  //     name: 'lqb',
  //     description: 'test_lqb',
  //     image: 'my_avator_path'
  // };
  // await setProfile(profile);
  // console.log(await getProfile());

  const bookmark: Bookmark = {
    type: enums.DefaultTypeKeys.NFT,
    url: 'test.com',
    title: 'test_title',
    collections: ['222'],
    description: 'test_desc',
    tags: ['defi', 'nft'],
    tokenId: '1112',
    contract: '0x',
    image: 'image_path',
    owner: 'test_owner',
    date: new Date().toISOString(),
  };

  await addBookmark(bookmark, bookmark.collections[0]);
  const collection = await getBookmarks(bookmark.collections[0]);
  console.log(collection);

  const bookmark1: Bookmark = {
    type: enums.DefaultTypeKeys.NFT,
    url: 'test.com',
    title: 'test_title',
    collections: ['111'],
    description: 'test_desc',
    tags: ['defi', 'nft'],
    tokenId: '1112',
    contract: '0x',
    image: 'image_path',
    owner: 'test_owner',
    date: new Date().toISOString(),
  };

  await addBookmark(bookmark1, bookmark1.collections[0]);

  const collections = await getAllBookmarks();
  console.log(collections);
}

main();
