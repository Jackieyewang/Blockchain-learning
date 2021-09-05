export class Bookmark {
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
