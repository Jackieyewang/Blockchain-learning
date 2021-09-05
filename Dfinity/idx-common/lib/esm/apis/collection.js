var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DefaultCollectionKeys, IDXAliases } from '../constants/enums';
import { getDefaultCollections } from '../utils/schema';
// import { deleteBookmark } from './bookmark';
export function initCollections(idx) {
    return __awaiter(this, void 0, void 0, function* () {
        yield idx.remove(IDXAliases.COLLECTIONS);
        const collectionsID = yield idx.set(IDXAliases.COLLECTIONS, getDefaultCollections(Object.values(DefaultCollectionKeys)));
        return collectionsID.toUrl();
    });
}
export function hasCollections(idx, did) {
    return __awaiter(this, void 0, void 0, function* () {
        return idx.has(IDXAliases.COLLECTIONS, did);
    });
}
export function getCollections(idx, did) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collections = idx.get(IDXAliases.COLLECTIONS, did);
            if (!collections) {
                throw new Error(`Collections are not initialized in your metaverse`);
            }
            return collections;
        }
        catch (_a) {
            yield initCollections(idx);
            const defaultCollections = {
                'private': [], 'public': [],
                'unsorted': [], 'trash': []
            };
            return defaultCollections;
        }
    });
}
export function getCollectionNames(idx, did) {
    return __awaiter(this, void 0, void 0, function* () {
        const collections = yield getCollections(idx, did);
        if (!collections) {
            throw new Error(`Collections are not initialized in your metaverse`);
        }
        const names = [];
        for (let key in collections) {
            names.push(key);
        }
        return names;
    });
}
export function getCollectionByKey(idx, params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collections = yield getCollections(idx, params.did);
            if (!collections) {
                throw new Error(`Collections are not initialized in your metaverse`);
            }
            const collectionForKey = collections[params.key];
            if (!Array.isArray(collectionForKey)) {
                throw new Error(`Collection key ${params.key} is not created in your metaverse`);
            }
            return collectionForKey;
        }
        catch (error) {
            return null;
        }
    });
}
export function newCollection(idx, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const collections = yield getCollections(idx, params.did);
        if (!collections) {
            throw new Error(`Collections are not initialized in your metaverse`);
        }
        const collectionForKey = collections[params.key];
        if (Array.isArray(collectionForKey)) {
            return 'Already exists';
        }
        const collectionsID = yield idx.set(IDXAliases.COLLECTIONS, Object.assign(Object.assign({}, collections), { [params.key]: [] }));
        return collectionsID.toUrl();
    });
}
// export async function removeCollection(
//     idx: IDX,
//     params: {
//         key: string;
//         did?: string;
//     }
// ): Promise<boolean> {
// }
// export async function updateCollectionName(
//     idx: IDX,
//     params: {
//         key: string;
//         did?: string;
//     }
// ): Promise<boolean> {
// }
