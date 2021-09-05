import type { Stream } from '@ceramicnetwork/common';

interface CeramicDoc<T> extends Stream {
  content: T;
}
