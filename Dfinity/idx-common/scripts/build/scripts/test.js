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
exports.getCollectionNames = exports.getAllBookmarks = exports.getBookmarks = exports.addBookmark = exports.initCollections = exports.getProfile = exports.setProfile = exports.initialize = void 0;
const ethers_1 = require("ethers");
const src_1 = require("../src");
let ceramic;
let idx;
function initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        ceramic = src_1.apis.ceramic.createCeramic('http://localhost:7007');
        const seed = ethers_1.ethers.utils.arrayify('0x00000000000000000000000000000002');
        const didProvider = yield src_1.apis.threeId.createThreeIdFromSeed({ ceramic, seed });
        idx = src_1.apis.idx.createIDX(ceramic);
        yield src_1.apis.threeId.authenticate({ ceramic, didProvider });
    });
}
exports.initialize = initialize;
function setProfile(profile) {
    return __awaiter(this, void 0, void 0, function* () {
        return src_1.apis.profile.setBasicProfileDocContent(idx, profile);
    });
}
exports.setProfile = setProfile;
function getProfile(did) {
    return __awaiter(this, void 0, void 0, function* () {
        return src_1.apis.profile.getBasicProfileDocContent(idx, did);
    });
}
exports.getProfile = getProfile;
function initCollections(did) {
    return __awaiter(this, void 0, void 0, function* () {
        const isCollectionInit = yield src_1.apis.collection.hasCollections(idx, did);
        if (!isCollectionInit) {
            yield src_1.apis.collection.initCollections(idx);
        }
    });
}
exports.initCollections = initCollections;
function addBookmark(bookmark, key) {
    return __awaiter(this, void 0, void 0, function* () {
        return src_1.apis.bookmark.addBookmarkToCollection(idx, {
            bookmarkToAdd: bookmark,
            collectionKey: key,
        });
    });
}
exports.addBookmark = addBookmark;
function getBookmarks(key) {
    return __awaiter(this, void 0, void 0, function* () {
        return src_1.apis.bookmark.getBookmarksFromCollection(idx, key);
    });
}
exports.getBookmarks = getBookmarks;
function getAllBookmarks() {
    return __awaiter(this, void 0, void 0, function* () {
        return src_1.apis.bookmark.getAllBookmarks(idx);
    });
}
exports.getAllBookmarks = getAllBookmarks;
function getCollectionNames(did) {
    return __awaiter(this, void 0, void 0, function* () {
        return src_1.apis.collection.getCollectionNames(idx, did);
    });
}
exports.getCollectionNames = getCollectionNames;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield initialize();
        console.log(idx.id);
        yield initCollections();
        // const profile: BasicProfile = {
        //     name: 'lqb',
        //     description: 'test_lqb',
        //     image: 'my_avator_path'
        // };
        // await setProfile(profile);
        // console.log(await getProfile());
        const bookmark = {
            type: src_1.enums.DefaultTypeKeys.NFT,
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
        yield addBookmark(bookmark, bookmark.collections[0]);
        const collection = yield getBookmarks(bookmark.collections[0]);
        console.log(collection);
        const bookmark1 = {
            type: src_1.enums.DefaultTypeKeys.NFT,
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
        yield addBookmark(bookmark1, bookmark1.collections[0]);
        const collections = yield getAllBookmarks();
        console.log(collections);
    });
}
main();
