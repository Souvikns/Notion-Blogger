import { NotionAdapter } from "./notion";

export interface AppConstructor {
    notion: {
        api_key: string,
        database_id: string
    },
    blogTokens: {
        dev: string,
        hashnode: string
    }
}

export class App {
    private readonly notionAdapter: NotionAdapter;
    constructor(config: AppConstructor){
        this.notionAdapter = NotionAdapter.instantiate({
            api_key: config.notion.api_key,
            database_id: config.notion.database_id
        });
    }
}