import { NotionAdapter } from '../src/notion';
import { Blogger } from '../src/blogger';

const notionAdapter = NotionAdapter.instantiate({
    api_key: process.env.NOTION_API_KEY,
    database_id: process.env.NOTION_DATABASE_ID
});

const blogger = new Blogger({ dev: process.env.DEV_API_KEY });


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
        const { title, series } = pages[0];
        expect(title).toMatch("Testing Blog");
        expect(series).toMatch('Testing series');
    })

    it('should load page content ', async () => {
        const pages = await notionAdapter.fetchPagesReadyToPublish();
        const pageContent = await notionAdapter.getPageContent(pages[0].id);
        expect(typeof pageContent === 'string').toBeTruthy();
    })

    it('Should post article to dev.to', async () => {


        try {
            const pages = await notionAdapter.fetchPagesReadyToPublish();
            for (const page of pages) {
                const content = await notionAdapter.getPageContent(page.id);
                const { message, status } = await blogger.postTo.dev({
                    body_markdown: content,
                    title: page.title,
                    main_image: page.cover_image,
                    series: page.series,
                    tags: page.tags,
                    publish: false
                });

                console.log(message, status);

                expect(status).toEqual(201);

            }
        } catch (error) {
            console.log(error);
        }
    })
})