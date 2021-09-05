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
const schemas_1 = __importDefault(require("../schemas"));
const ceramic_1 = require("../src/apis/ceramic");
const threeId_1 = require("../src/apis/threeId");
const dotenv_1 = require("../src/utils/dotenv");
const utils_1 = require("./utils");
const { Bookmark, Collections } = schemas_1.default;
const schemasToPublish = {
    Bookmark,
    Collections
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { CERAMIC_API_HOST } = yield dotenv_1.parseDotenv();
            const ceramic = ceramic_1.createCeramic(CERAMIC_API_HOST);
            yield idx_tools_1.publishIDXConfig(ceramic);
            const seed = yield dotenv_1.parseSeedFromDotenv();
            yield threeId_1.createThreeIdFromSeed({ ceramic, seed });
            const docIDs = yield publishSchemas(ceramic);
            utils_1.createJSONFile(`${process.cwd()}/schemas/publishedSchemas.json`, docIDs);
            process.exit();
        }
        catch (error) {
            console.error(error);
            process.exit(-1);
        }
    });
}
function publishSchemas(ceramic) {
    return __awaiter(this, void 0, void 0, function* () {
        const { CERAMIC_API_HOST } = yield dotenv_1.parseDotenv();
        console.log(`Publishing schemas to ceramic node at: ${CERAMIC_API_HOST}`);
        const schemaNameToDocId = {};
        for (const schemaName of Object.keys(schemasToPublish)) {
            const schema = schemasToPublish[schemaName];
            try {
                const schemaDoc = yield idx_tools_1.publishSchema(ceramic, {
                    name: schema.title,
                    content: schema,
                });
                const schemaDocID = schemaDoc.commitId.toUrl();
                schemaNameToDocId[schemaName] = schemaDocID;
                console.log(`✅ Schema ${schema.title} published. DocId: ${schemaDocID}`);
            }
            catch (error) {
                console.log(`❌ Schema ${schema.title} failed.`, error);
            }
        }
        return schemaNameToDocId;
    });
}
main();
