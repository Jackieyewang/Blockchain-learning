var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { IDX } from '@ceramicstudio/idx';
import { aliases } from '../constants';
import { initCollections, hasCollections } from './collection';
export function createIDX(ceramic) {
    const idx = new IDX({
        ceramic,
        aliases: Object.assign({}, aliases),
    });
    return idx;
}
export function setDefaultIDX(idx) {
    return __awaiter(this, void 0, void 0, function* () {
        const [CollectionDocID] = yield Promise.all([
            initCollections(idx)
        ]);
        return {
            CollectionDocID
        };
    });
}
export function hasDefaultIDX(idx) {
    return __awaiter(this, void 0, void 0, function* () {
        const [CollectionsSetup] = yield Promise.all([
            hasCollections(idx)
        ]);
        return CollectionsSetup;
    });
}
