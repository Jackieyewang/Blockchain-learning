"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Collections_json_1 = __importDefault(require("./Collections.json"));
const Bookmark_json_1 = __importDefault(require("./Bookmark.json"));
const publishedSchemas_json_1 = __importDefault(require("./publishedSchemas.json"));
const publishedDefinitions_json_1 = __importDefault(require("./publishedDefinitions.json"));
const schemas = {
    Bookmark: Bookmark_json_1.default,
    Collections: Collections_json_1.default,
    publishedSchemas: publishedSchemas_json_1.default,
    publishedDefinitions: publishedDefinitions_json_1.default,
};
exports.default = schemas;
