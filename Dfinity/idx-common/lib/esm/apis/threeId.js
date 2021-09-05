var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import ThreeIdDidProvider from '3id-did-provider';
import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect';
import { DID } from 'dids';
export function createThreeIdFromSeed({ ceramic, seed, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const threeIdProvider = yield ThreeIdDidProvider.create({
            // @ts-ignore
            ceramic,
            getPermission: () => __awaiter(this, void 0, void 0, function* () { return []; }),
            seed,
        });
        const didProvider = threeIdProvider.getDidProvider();
        return didProvider;
    });
}
export function createThreeIdFromEthereumProvider({ threeIdConnectHost, ethereumProvider, address, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const ethereumAuthProvider = new EthereumAuthProvider(ethereumProvider, address);
        const threeIdConnect = new ThreeIdConnect();
        yield threeIdConnect.connect(ethereumAuthProvider);
        const didProvider = threeIdConnect.getDidProvider();
        return didProvider;
    });
}
export function authenticate({ ceramic, didProvider }) {
    return __awaiter(this, void 0, void 0, function* () {
        const did = new DID({
            provider: didProvider,
            // @ts-ignore
            resolver: ThreeIdResolver.getResolver(ceramic),
        });
        yield ceramic.setDID(did);
        yield did.authenticate();
    });
}
