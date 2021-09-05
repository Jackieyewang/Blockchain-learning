var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import dotenv from 'dotenv';
import { ethers } from 'ethers';
export function parseDotenv(dotenvPath = '.env') {
    const result = dotenv.config({
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
export function parseSeedFromDotenv() {
    return __awaiter(this, void 0, void 0, function* () {
        const { PUBLISHER_IDW_SEED } = parseDotenv();
        const seed = ethers.utils.arrayify(PUBLISHER_IDW_SEED);
        return seed;
    });
}
