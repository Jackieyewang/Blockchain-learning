import { apis, Bookmark, BasicProfile } from 'idx-common';
import { IDX } from '@ceramicstudio/idx';
import storage from '../utils/storage';
import { STORAGE_TYPE } from '../utils/constants';

let idx: IDX;

export async function authenticateWithEthereum (
  ethereumProvider: any,
  address: string
): Promise<void> {
  const ceramic = apis.ceramic.createCeramic(process.env.CERAMIC_API_HOST);

  const didProvider = await apis.threeId.createThreeIdFromEthereumProvider({
    threeIdConnectHost: process.env.THREE_ID_CONNECT_HOST,
    ethereumProvider,
    address
  });

  idx = apis.idx.createIDX(ceramic);

  await apis.threeId.authenticate({ ceramic, didProvider });
}

export function isIDXAuthenticated (): boolean {
  return idx?.authenticated;
}

export function getDID (): string {
  return idx?.id;
}

export async function setProfile (profile: BasicProfile) {
  return apis.profile.setBasicProfileDocContent(idx, profile);
}

export async function getProfile (did?: string) {
  return apis.profile.getBasicProfileDocContent(idx, did);
}

export async function initCollections (did?: string) {
  if (!(await apis.collection.hasCollections(idx, did))) {
    return apis.collection.initCollections(idx);
  }
  return true;
}

export async function addBookmark (bookmark: Bookmark, key?: string): Promise<string> {
  return apis.bookmark.addBookmarkToCollection(idx, {
    bookmarkToAdd: bookmark,
    collectionKey: key
  });
}

export async function getBookmarks (key: string): Promise<Bookmark[]> {
  return apis.bookmark.getBookmarksFromCollection(idx, key);
}

export async function getAllBookmarks (): Promise<{ [key: string]: Bookmark[] }> {
  return apis.bookmark.getAllBookmarks(idx);
}

export function isLogin() {
  return Boolean(storage.getItem(STORAGE_TYPE.STORED_DID));
}