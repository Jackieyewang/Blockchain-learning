import Ceremic from '@ceramicnetwork/http-client';
export function createCeramic(ceramicApiHost = 'http://localhost:7007') {
    const ceramic = new Ceremic(ceramicApiHost);
    return ceramic;
}
