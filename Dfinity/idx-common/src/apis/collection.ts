import { IDX } from '@ceramicstudio/idx';

import { DefaultCollectionKeys, IDXAliases } from '../constants/enums';
import { Collections } from '../models';
import { getDefaultCollections } from '../utils/schema';

// import { deleteBookmark } from './bookmark';

export async function initCollections(idx: IDX): Promise<string> {
    await idx.remove(IDXAliases.COLLECTIONS);
    const collectionsID = await idx.set(IDXAliases.COLLECTIONS,
        getDefaultCollections(Object.values(DefaultCollectionKeys)));
    return collectionsID.toUrl();
}

export async function hasCollections(
    idx: IDX,
    did?: string
): Promise<boolean> {
    return idx.has(IDXAliases.COLLECTIONS, did);
}

export async function getCollections(
    idx: IDX,
    did?: string
): Promise<Collections | null> {
    try {
        const collections = idx.get<Collections>(IDXAliases.COLLECTIONS, did);
        if (!collections) {
            throw new Error(`Collections are not initialized in your metaverse`);
        }
        return collections;
    }
    catch {
        await initCollections(idx);
        const defaultCollections = {
            'private': [], 'public': [],
            'unsorted': [], 'trash': []
        };
        return defaultCollections;
    }
}

export async function getCollectionNames(
    idx: IDX,
    did?: string
): Promise<string[]> {
    const collections = await getCollections(idx, did);
    if (!collections) {
        throw new Error(`Collections are not initialized in your metaverse`);
    }

    const names: string[] = [];
    for (let key in collections) {
        names.push(key);
    }

    return names;
}

export async function getCollectionByKey(
    idx: IDX,
    params: {
        key: string;
        did?: string;
    }
): Promise<string[] | null> {
    try {
        const collections = await getCollections(idx, params.did);
        if (!collections) {
            throw new Error(`Collections are not initialized in your metaverse`);
        }
        const collectionForKey = collections[params.key];
        if (!Array.isArray(collectionForKey)) {
            throw new Error(`Collection key ${params.key} is not created in your metaverse`);
        }
        return collectionForKey;
    } catch (error) {
        return null;
    }
}

export async function newCollection(
    idx: IDX,
    params: {
        key: string;
        did?: string;
    }
): Promise<string> {
    const collections = await getCollections(idx, params.did);
    if (!collections) {
        throw new Error(`Collections are not initialized in your metaverse`);
    }

    const collectionForKey = collections[params.key];
    if (Array.isArray(collectionForKey)) {
        return 'Already exists';
    }

    const collectionsID = await idx.set(IDXAliases.COLLECTIONS, {
        ...collections,
        [params.key]: [],
    });

    return collectionsID.toUrl();
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