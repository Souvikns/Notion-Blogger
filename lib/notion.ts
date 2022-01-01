import { Client } from '@notionhq/client';
import Notion2md from 'notion-to-md';

export interface NotionConfig {
    api_key: string
    database_id: string
}

export class NotionAdapter {
    private readonly notion: Client;
    private readonly database_id: string;
    private readonly n2m: Notion2md;
    constructor(notion: Client, database_id: string) {
        this.notion = notion;
        this.database_id = database_id;
        this.n2m = new Notion2md({ notionClient: this.notion });
    }

    async fetchBlogs() {
        const Blogs = []
        const pages = await this.fethReadyBlogs();
        for (const page of pages) {
            const content = await this.getPageContent(page.id);
            Blogs.push({ ...page, content: content });
        };
        return Blogs;
    }

    async updateBlogStatus(page_id: string) {
        this.notion.pages.update({
            page_id: page_id,
            properties: {
                status: {
                    select: {
                        name: "published"
                    }
                }
            }
        })
    }

    private async fethReadyBlogs() {
        const { results } = await this.notion.databases.query({
            database_id: this.database_id,
            filter: {
                and: [
                    { property: 'status', select: { equals: 'ready-to-publish' } }
                ]
            }
        });

        return results.map((res: any) => ({
            id: res.id,
            cover_image: res.cover?.external.url,
            title: res.properties.Name.title[0].plain_text,
            description: res.properties.Description.rich_text[0].plain_text,
            tags: res.properties.Tags.multi_select.map((s: any) => s.name),
            series: res.properties.Series.rich_text[0].plain_text
        }))
    }

    private async getPageContent(page_id: string) {
        const mdBlocks = await this.n2m.pageToMarkdown(page_id);
        return this.n2m.toMarkdownString(mdBlocks);
    }

    static instantiate({ api_key, database_id }: NotionConfig) {
        return new NotionAdapter(new Client({ auth: api_key }), database_id);
    }
}