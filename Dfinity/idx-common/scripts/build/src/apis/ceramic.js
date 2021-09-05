"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCeramic = void 0;
const http_client_1 = __importDefault(require("@ceramicnetwork/http-client"));
function createCeramic(ceramicApiHost = 'http://localhost:7007') {
    const ceramic = new http_client_1.default(ceramicApiHost);
    return ceramic;
}
exports.createCeramic = createCeramic;
