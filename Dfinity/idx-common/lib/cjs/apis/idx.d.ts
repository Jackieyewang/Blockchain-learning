import { IDX } from '@ceramicstudio/idx';
import type { CeramicApi } from '@ceramicnetwork/common';
export declare function createIDX(ceramic: CeramicApi): IDX;
export declare function setDefaultIDX(idx: IDX): Promise<{
    CollectionDocID: string;
}>;
export declare function hasDefaultIDX(idx: IDX): Promise<boolean>;
