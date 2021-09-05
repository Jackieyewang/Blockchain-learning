import { schemas, definitions } from '../constants';

export function getDefaultCollections(DefaultCollectionKey: string[] = []) {
  return DefaultCollectionKey.reduce(
    (defaultCollections, defaultKey) => ({
      ...defaultCollections,
      [defaultKey]: [],
    }),
    {},
  );
}

export function getSchemaNameByDocID(docID?: string): string | null {
  return findRecordKeyByValue(schemas, docID);
}

export function getDefinitionNameByDocID(docID?: string): string | null {
  return findRecordKeyByValue(definitions, docID);
}

function findRecordKeyByValue(
  records: {
    [key: string]: string;
  },
  value?: string,
): string | null {
  if (!value) {
    return null;
  }

  const valueIndex = Object.values(records).indexOf(value);

  return valueIndex === -1 ? null : Object.keys(records)[valueIndex];
}