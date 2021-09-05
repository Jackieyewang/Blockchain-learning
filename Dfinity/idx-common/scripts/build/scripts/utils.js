"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJSONFile = void 0;
const fs_1 = require("fs");
function createJSONFile(path, fileContent) {
    fs_1.writeFileSync(path, JSON.stringify(fileContent, null, 2));
}
exports.createJSONFile = createJSONFile;
exports.default = {
    createJSONFile,
};
