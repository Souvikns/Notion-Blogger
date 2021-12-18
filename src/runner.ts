import * as core from '@actions/core';
import * as github from '@actions/github';
import { NotionAdapter } from './notion';
import {Blogger} from './blogger';

const NOTION_API_KEY = process.env.NOTION_API_KEY || core.getInput('NOTION_API_KEY');
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID || core.getInput('NOTION_DATABASE_ID');



async function run(){
    if (!NOTION_API_KEY) throw new Error("Notion Api key not found");
    if (!NOTION_DATABASE_ID) throw new Error("Notion Database ID not found");
    const notion = NotionAdapter.instantiate({api_key: NOTION_API_KEY, database_id: NOTION_DATABASE_ID});
    const blogger = new Blogger({dev: '', hashnode: ''});
    console.log('Fetching pages ready to be published');
    const pages = await notion.fetchPagesReadyToPublish();
    console.log(`Found ${pages.length} pages ready to be published`);
    for(const page of pages) {
        const content: string = await notion.getPageContent(page.id);
        const {message} = await blogger.postTo.dev({
            body_markdown: content,
            title: page.title,
            description: page.description,
            main_image: page.cover_image,
            series: page.series,
            tags: page.tags
        });
        console.log(message);

    }
}

run().catch((e: Error) => {
    console.error(e);
    core.setFailed(e.message);
})