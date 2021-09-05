"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const prettier_1 = __importDefault(require("prettier"));
const schemas_1 = __importDefault(require("../schemas"));
const constantsFolderPath = `${process.cwd()}/src/constants`;
function main() {
    const publishedDefinitionsString = `
  export const PUBLISHED_DEFINITIONS = ${JSON.stringify(schemas_1.default.publishedDefinitions, null, 2)};
  `;
    const publishedSchemasString = `
  export const PUBLISHED_SCHEMAS = ${JSON.stringify(schemas_1.default.publishedSchemas, null, 2)};\n
  `;
    fs_1.writeFileSync(`${constantsFolderPath}/definitions.ts`, prettier_1.default.format(publishedDefinitionsString, {
        parser: 'babel',
        singleQuote: true,
    }));
    fs_1.writeFileSync(`${constantsFolderPath}/schemas.ts`, prettier_1.default.format(publishedSchemasString, {
        parser: 'babel',
        singleQuote: true,
    }));
}
main();
