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
exports.hasDefaultIDX = exports.setDefaultIDX = exports.createIDX = void 0;
const idx_1 = require("@ceramicstudio/idx");
const constants_1 = require("../constants");
const collection_1 = require("./collection");
function createIDX(ceramic) {
    const idx = new idx_1.IDX({
        ceramic,
        aliases: Object.assign({}, constants_1.aliases),
    });
    return idx;
}
exports.createIDX = createIDX;
function setDefaultIDX(idx) {
    return __awaiter(this, void 0, void 0, function* () {
        const [CollectionDocID] = yield Promise.all([
            collection_1.initCollections(idx)
        ]);
        return {
            CollectionDocID
        };
    });
}
exports.setDefaultIDX = setDefaultIDX;
function hasDefaultIDX(idx) {
    return __awaiter(this, void 0, void 0, function* () {
        const [CollectionsSetup] = yield Promise.all([
            collection_1.hasCollections(idx)
        ]);
        return CollectionsSetup;
    });
}
exports.hasDefaultIDX = hasDefaultIDX;
