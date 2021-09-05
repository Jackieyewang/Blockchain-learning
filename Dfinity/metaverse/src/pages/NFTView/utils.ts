import type { Bookmark } from 'idx-common';
import { PromiseValue } from 'type-fest';

import {
  authenticateWithEthereum,
  getAllBookmarks,
  getBookmarks,
  getDID,
  initCollections,
  isIDXAuthenticated,
} from '../../apis/ceramic';
import { connectWithWeb3 } from '../../apis/web3';
import { COLLECTION_TYPE, STORAGE_TYPE, EVENT_TYPE } from '../../utils/constants';
import storage from '../../utils/storage';
import EventBus from '../../utils/EventBus';

export async function getCustomBookmarks(collection: string) {
  if (!isIDXAuthenticated()) {
    const { provider, addresses } = await connectWithWeb3();
    await authenticateWithEthereum(provider, addresses[0]);
    await initCollections();
  }

  let collectionsNames: string[] = [];
  let collections: Bookmark[] = [];

  if (collection === COLLECTION_TYPE.AllBookmarks) {
    const res = await getAllBookmarks();
    collections = formatAllBookmarks(res);
    collectionsNames = Object.keys(res);
    EventBus.emit(EVENT_TYPE.SET_DID, getDID());
    EventBus.emit(EVENT_TYPE.SET_COLLECTIONS_MENUS, collectionsNames);
    storage.setItem(STORAGE_TYPE.STORED_COLLECTIONS, collections);
    storage.setItem(STORAGE_TYPE.STORED_COLLECTIONS_NAMES, collectionsNames);
    storage.setItem(STORAGE_TYPE.STORED_DID, getDID());
  } else {
    collections = await getBookmarks(collection);
  }

  const res = {
    list: collections,
    did: getDID(),
  };

  return res;
}

export function formatAllBookmarks(res: PromiseValue<ReturnType<typeof getAllBookmarks>>) {
  const ret: Bookmark[] = [];
  for (const value of Object.values(res)) {
    ret.push(...value);
  }
  return ret;
}
