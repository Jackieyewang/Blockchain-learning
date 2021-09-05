"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefinitionNameByDocID = exports.getSchemaNameByDocID = exports.getDefaultCollections = void 0;
const constants_1 = require("../constants");
function getDefaultCollections(DefaultCollectionKey = []) {
    return DefaultCollectionKey.reduce((defaultCollections, defaultKey) => (Object.assign(Object.assign({}, defaultCollections), { [defaultKey]: [] })), {});
}
exports.getDefaultCollections = getDefaultCollections;
function getSchemaNameByDocID(docID) {
    return findRecordKeyByValue(constants_1.schemas, docID);
}
exports.getSchemaNameByDocID = getSchemaNameByDocID;
function getDefinitionNameByDocID(docID) {
    return findRecordKeyByValue(constants_1.definitions, docID);
}
exports.getDefinitionNameByDocID = getDefinitionNameByDocID;
function findRecordKeyByValue(records, value) {
    if (!value) {
        return null;
    }
    const valueIndex = Object.values(records).indexOf(value);
    return valueIndex === -1 ? null : Object.keys(records)[valueIndex];
}
