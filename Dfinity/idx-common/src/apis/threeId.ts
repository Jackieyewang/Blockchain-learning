import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import ThreeIdDidProvider from '3id-did-provider';
import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect'
import { DID } from 'dids';

import type { CeramicApi } from '@ceramicnetwork/common';

export async function createThreeIdFromSeed({
  ceramic,
  seed,
}: {
  ceramic: CeramicApi;
  seed: Uint8Array;
}) {
  const threeIdProvider = await ThreeIdDidProvider.create({
    // @ts-ignore
    ceramic,
    getPermission: async () => [],
    seed,
  });

  const didProvider = threeIdProvider.getDidProvider();
  return didProvider;
}

export async function createThreeIdFromEthereumProvider({
  threeIdConnectHost,
  ethereumProvider,
  address,
}: {
  threeIdConnectHost?: string;
  ethereumProvider: any;
  address: string;
}) {
  const ethereumAuthProvider = new EthereumAuthProvider(
    ethereumProvider,
    address
  );
  const threeIdConnect = new ThreeIdConnect();
  await threeIdConnect.connect(ethereumAuthProvider);

  const didProvider = threeIdConnect.getDidProvider();
  return didProvider;
}

export async function authenticate({
  ceramic,
  didProvider
}: {
  ceramic: CeramicApi;
  didProvider: any;
}) {
  const did = new DID({
    provider: didProvider,
    // @ts-ignore
    resolver: ThreeIdResolver.getResolver(ceramic),
  });
  await ceramic.setDID(did);
  await did.authenticate();
}
