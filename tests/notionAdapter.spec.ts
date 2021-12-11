import {NotionAdapter} from '../src/notion';

const notionAdapter = NotionAdapter.instantiate(process.env.NOTION_API_KEY, process.env.NOTION_DATABASE_ID);

describe('env variables', () => {
    it('should be accessable', () => {
        const notion_api_key = process.env.NOTION_API_KEY;
        expect(notion_api_key).toBeTruthy();
    })
})

describe('Notion Adapter should', () => {
    it('be truthy', () => {
        expect(notionAdapter).toBeTruthy();
    })
})