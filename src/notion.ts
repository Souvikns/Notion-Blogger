import { Client } from '@notionhq/client';
import {NotionAdapterInput, NotionPage} from './type';
import Notion2md from 'notion-to-md';

export class NotionAdapter {
    private readonly notion: Client;
    private readonly n2m: any;
    private readonly database_id: string;
    constructor(notion: Client, database_id?: string) {
        this.notion = notion;
        this.database_id = database_id || '';
        this.n2m = new Notion2md({notionClient: this.notion});
    }

    async fetchPagesReadyToPublish(): Promise<Array<NotionPage>> {
        const {results} =  await this.notion.databases.query({
            database_id: this.database_id,
            filter: {
                and: [
                    { property: 'status', select: { equals: 'ready-to-publish' } }
                ]
            }
        })

        return results.map((res: any) => ({
            id: res.id,
            cover_image: res.cover?.external.url,
            title: res.properties.Name.title[0].plain_text,
            description: res.properties.Description.rich_text[0].plain_text,
            tags: res.properties.Tags.multi_select.map((s: any) => s.name),
            series: res.properties.Series.rich_text[0].plain_text
        }))
    }

    async getPageContent(page_id: string) {
        const mdBlocks = await this.n2m.pageToMarkdown(page_id);
        return this.n2m.toMarkdownString(mdBlocks);
    }

    static instantiate({api_key, database_id}: NotionAdapterInput) {
        return new NotionAdapter(new Client({ auth: api_key }), database_id);
    }
}