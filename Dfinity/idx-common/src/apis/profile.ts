import { IDX } from '@ceramicstudio/idx';

import { BasicProfile } from '../models';

export async function getBasicProfileDocContent(
  idx: IDX,
  did?: string,
): Promise<BasicProfile | null> {
  return idx.get<BasicProfile>('basicProfile', did);
}

export async function setBasicProfileDocContent(
  idx: IDX,
  basicProfile: BasicProfile,
): Promise<string> {
  const docID = await idx.set('basicProfile', basicProfile);
  return docID.toUrl();
}
