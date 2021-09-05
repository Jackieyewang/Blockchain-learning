import { IDX } from '@ceramicstudio/idx';
import { Collections } from '../models';
export declare function initCollections(idx: IDX): Promise<string>;
export declare function hasCollections(idx: IDX, did?: string): Promise<boolean>;
export declare function getCollections(idx: IDX, did?: string): Promise<Collections | null>;
export declare function getCollectionNames(idx: IDX, did?: string): Promise<string[]>;
export declare function getCollectionByKey(idx: IDX, params: {
    key: string;
    did?: string;
}): Promise<string[] | null>;
export declare function newCollection(idx: IDX, params: {
    key: string;
    did?: string;
}): Promise<string>;
