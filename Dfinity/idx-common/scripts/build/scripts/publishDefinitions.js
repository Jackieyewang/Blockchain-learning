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
const idx_tools_1 = require("@ceramicstudio/idx-tools");
const publishedSchemas_json_1 = __importDefault(require("../schemas/publishedSchemas.json"));
const ceramic_1 = require("../src/apis/ceramic");
const threeId_1 = require("../src/apis/threeId");
const dotenv_1 = require("../src/utils/dotenv");
const utils_1 = require("./utils");
const DEFINITION_TO_SCHEMA_DOC_ID_MAP = {
    Collections: publishedSchemas_json_1.default.Collections
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { CERAMIC_API_HOST } = yield dotenv_1.parseDotenv();
            const ceramic = ceramic_1.createCeramic(CERAMIC_API_HOST);
            yield idx_tools_1.publishIDXConfig(ceramic);
            const seed = yield dotenv_1.parseSeedFromDotenv();
            yield threeId_1.createThreeIdFromSeed({ ceramic, seed });
            const docIDs = yield publishDefinitions(ceramic);
            utils_1.createJSONFile(`${process.cwd()}/schemas/publishedDefinitions.json`, docIDs);
            process.exit();
        }
        catch (error) {
            console.error(error);
            process.exit(-1);
        }
    });
}
function publishDefinitions(ceramic) {
    return __awaiter(this, void 0, void 0, function* () {
        const { CERAMIC_API_HOST } = yield dotenv_1.parseDotenv();
        console.log(`Publishing definitions to ceramic node at: ${CERAMIC_API_HOST}`);
        const definitionNameToDocId = {};
        for (const [definitionName, schemaDocID] of Object.entries(DEFINITION_TO_SCHEMA_DOC_ID_MAP)) {
            try {
                const definitionDoc = yield idx_tools_1.createDefinition(ceramic, {
                    description: definitionName,
                    name: definitionName,
                    schema: schemaDocID,
                });
                const definitionDocID = definitionDoc.id.toUrl();
                definitionNameToDocId[definitionName] = definitionDocID;
                console.log(`✅ Definition ${definitionName} published. DocId: ${definitionDocID}`);
            }
            catch (error) {
                console.log(`❌ Definition ${definitionName} failed.`, error);
            }
        }
        return definitionNameToDocId;
    });
}
main();
