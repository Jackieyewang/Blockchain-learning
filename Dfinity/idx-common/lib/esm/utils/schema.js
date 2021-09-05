import { schemas, definitions } from '../constants';
export function getDefaultCollections(DefaultCollectionKey = []) {
    return DefaultCollectionKey.reduce((defaultCollections, defaultKey) => (Object.assign(Object.assign({}, defaultCollections), { [defaultKey]: [] })), {});
}
export function getSchemaNameByDocID(docID) {
    return findRecordKeyByValue(schemas, docID);
}
export function getDefinitionNameByDocID(docID) {
    return findRecordKeyByValue(definitions, docID);
}
function findRecordKeyByValue(records, value) {
    if (!value) {
        return null;
    }
    const valueIndex = Object.values(records).indexOf(value);
    return valueIndex === -1 ? null : Object.keys(records)[valueIndex];
}
