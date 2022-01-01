import { NotionAdapter, NotionConfig } from "./notion";

export class NotionBlogger {
    private readonly notion: NotionAdapter
    constructor(notionConfig: NotionConfig) {
        this.notion = NotionAdapter.instantiate(notionConfig);
    }
}