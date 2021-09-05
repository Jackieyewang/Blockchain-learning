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
exports.newCollection = exports.getCollectionByKey = exports.getCollectionNames = exports.getCollections = exports.hasCollections = exports.initCollections = void 0;
const enums_1 = require("../constants/enums");
const schema_1 = require("../utils/schema");
// import { deleteBookmark } from './bookmark';
function initCollections(idx) {
    return __awaiter(this, void 0, void 0, function* () {
        yield idx.remove(enums_1.IDXAliases.COLLECTIONS);
        const collectionsID = yield idx.set(enums_1.IDXAliases.COLLECTIONS, schema_1.getDefaultCollections(Object.values(enums_1.DefaultCollectionKeys)));
        return collectionsID.toUrl();
    });
}
exports.initCollections = initCollections;
function hasCollections(idx, did) {
    return __awaiter(this, void 0, void 0, function* () {
        return idx.has(enums_1.IDXAliases.COLLECTIONS, did);
    });
}
exports.hasCollections = hasCollections;
function getCollections(idx, did) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collections = idx.get(enums_1.IDXAliases.COLLECTIONS, did);
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
exports.getCollections = getCollections;
function getCollectionNames(idx, did) {
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
exports.getCollectionNames = getCollectionNames;
function getCollectionByKey(idx, params) {
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
exports.getCollectionByKey = getCollectionByKey;
function newCollection(idx, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const collections = yield getCollections(idx, params.did);
        if (!collections) {
            throw new Error(`Collections are not initialized in your metaverse`);
        }
        const collectionForKey = collections[params.key];
        if (Array.isArray(collectionForKey)) {
            return 'Already exists';
        }
        const collectionsID = yield idx.set(enums_1.IDXAliases.COLLECTIONS, Object.assign(Object.assign({}, collections), { [params.key]: [] }));
        return collectionsID.toUrl();
    });
}
exports.newCollection = newCollection;
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
