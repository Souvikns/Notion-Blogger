import { NotionAdapter, NotionConfig } from "./notion";

export class NotionBlogger {
    private readonly notion: NotionAdapter
    constructor(notionConfig: NotionConfig) {
        this.notion = NotionAdapter.instantiate(notionConfig);
    }
    async post(): Promise<void> {
        const blogs = await this.notion.fetchBlogs();
        // publish the blogs and then update the status. 
    }
}