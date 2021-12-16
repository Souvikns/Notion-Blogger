import {NotionAdapter} from '../src/notion';

const notionAdapter = NotionAdapter.instantiate({
    api_key: process.env.NOTION_API_KEY,
    database_id: process.env.NOTION_DATABASE_ID
});


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

    it('Should fetch pages that are ready to be published', async () => {
        const pages = await notionAdapter.fetchPagesReadyToPublish();
        const {title, series} = pages[0];
        expect(title).toMatch("Testing Blog");
        expect(series).toMatch('Testing series');
    })

    it('should load page content ', async () => {
        const pages = await notionAdapter.fetchPagesReadyToPublish();
        const pageContent = await notionAdapter.getPageContent(pages[0].id);
        expect(typeof pageContent === 'string').toBeTruthy();
    })
})