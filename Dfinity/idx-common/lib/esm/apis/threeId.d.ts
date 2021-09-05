import type { CeramicApi } from '@ceramicnetwork/common';
export declare function createThreeIdFromSeed({ ceramic, seed, }: {
    ceramic: CeramicApi;
    seed: Uint8Array;
}): Promise<import("3id-did-provider/lib/did-provider").DidProvider>;
export declare function createThreeIdFromEthereumProvider({ threeIdConnectHost, ethereumProvider, address, }: {
    threeIdConnectHost?: string;
    ethereumProvider: any;
    address: string;
}): Promise<import("@3id/connect").DidProviderProxy>;
export declare function authenticate({ ceramic, didProvider }: {
    ceramic: CeramicApi;
    didProvider: any;
}): Promise<void>;
