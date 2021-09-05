import Ceremic from '@ceramicnetwork/http-client';
import type { CeramicApi } from '@ceramicnetwork/common';

export function createCeramic(ceramicApiHost = 'http://localhost:7007') {
  const ceramic = new Ceremic(ceramicApiHost) as CeramicApi;
  return ceramic;
}
