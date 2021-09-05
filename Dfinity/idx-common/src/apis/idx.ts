import { IDX } from '@ceramicstudio/idx';

import { aliases } from '../constants';
import { initCollections, hasCollections } from './collection';

import type { CeramicApi } from '@ceramicnetwork/common';

export function createIDX(ceramic: CeramicApi) {
  const idx = new IDX({
    ceramic,
    aliases: { ...aliases },
  });
  return idx;
}

export async function setDefaultIDX(idx: IDX) {
  const [
    CollectionDocID
  ] = await Promise.all([
    initCollections(idx)
  ]);

  return {
    CollectionDocID
  };
}

export async function hasDefaultIDX(idx: IDX) {
  const [
    CollectionsSetup
  ] = await Promise.all([
    hasCollections(idx)
  ]);

  return CollectionsSetup;
}
