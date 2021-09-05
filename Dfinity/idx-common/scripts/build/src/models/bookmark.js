"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bookmark = void 0;
class Bookmark {
    constructor() {
        this.type = '';
        this.url = '';
        this.title = '';
        this.description = '';
        this.tags = [''];
        this.collections = [''];
        this.date = new Date().toISOString();
        this.tokenId = '';
        this.contract = '';
        this.owner = '';
        this.image = '';
    }
}
exports.Bookmark = Bookmark;
