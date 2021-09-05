import Collections from './Collections.json';
import Bookmark from './Bookmark.json';
import publishedSchemas from './publishedSchemas.json';
import publishedDefinitions from './publishedDefinitions.json';

const schemas: {
  [key: string]: any;
} = {
  Bookmark,
  Collections,
  publishedSchemas,
  publishedDefinitions,
};

export default schemas;
