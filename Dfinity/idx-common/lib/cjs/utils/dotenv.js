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
exports.parseSeedFromDotenv = exports.parseDotenv = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const ethers_1 = require("ethers");
function parseDotenv(dotenvPath = '.env') {
    const result = dotenv_1.default.config({
        path: `${process.cwd()}/${dotenvPath}`,
    });
    if (result.error) {
        throw result.error;
    }
    if (!result.parsed) {
        throw new Error('Please provide a valid .env.local file');
    }
    return result.parsed;
}
exports.parseDotenv = parseDotenv;
function parseSeedFromDotenv() {
    return __awaiter(this, void 0, void 0, function* () {
        const { PUBLISHER_IDW_SEED } = parseDotenv();
        const seed = ethers_1.ethers.utils.arrayify(PUBLISHER_IDW_SEED);
        return seed;
    });
}
exports.parseSeedFromDotenv = parseSeedFromDotenv;
