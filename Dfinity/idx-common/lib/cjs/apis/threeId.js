"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.createThreeIdFromEthereumProvider = exports.createThreeIdFromSeed = void 0;
const _3id_did_resolver_1 = __importDefault(require("@ceramicnetwork/3id-did-resolver"));
const _3id_did_provider_1 = __importDefault(require("3id-did-provider"));
const connect_1 = require("@3id/connect");
const dids_1 = require("dids");
function createThreeIdFromSeed({ ceramic, seed, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const threeIdProvider = yield _3id_did_provider_1.default.create({
            // @ts-ignore
            ceramic,
            getPermission: () => __awaiter(this, void 0, void 0, function* () { return []; }),
            seed,
        });
        const didProvider = threeIdProvider.getDidProvider();
        return didProvider;
    });
}
exports.createThreeIdFromSeed = createThreeIdFromSeed;
function createThreeIdFromEthereumProvider({ threeIdConnectHost, ethereumProvider, address, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const ethereumAuthProvider = new connect_1.EthereumAuthProvider(ethereumProvider, address);
        const threeIdConnect = new connect_1.ThreeIdConnect();
        yield threeIdConnect.connect(ethereumAuthProvider);
        const didProvider = threeIdConnect.getDidProvider();
        return didProvider;
    });
}
exports.createThreeIdFromEthereumProvider = createThreeIdFromEthereumProvider;
function authenticate({ ceramic, didProvider }) {
    return __awaiter(this, void 0, void 0, function* () {
        const did = new dids_1.DID({
            provider: didProvider,
            // @ts-ignore
            resolver: _3id_did_resolver_1.default.getResolver(ceramic),
        });
        yield ceramic.setDID(did);
        yield did.authenticate();
    });
}
exports.authenticate = authenticate;
