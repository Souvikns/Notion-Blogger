import { Client } from '@notionhq/client';

export class NotionAdapter {
    private readonly notion: Client;
    private readonly database_id: string;
    constructor(notion: Client, database_id?: string) {
        this.notion = notion;
        this.database_id = database_id || '';
    }

    async fetchPagesReadyToPublish() {
        return await this.notion.databases.query({
            database_id: this.database_id,
            filter: {
                and: [
                    { property: 'status', select: { equals: 'ready-to-publish' } }
                ]
            }
        })
    }

    static instantiate(api_key?: string, database_id?: string) {
        return new NotionAdapter(new Client({ auth: api_key }), database_id);
    }
}