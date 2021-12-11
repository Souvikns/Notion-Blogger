import * as core from '@actions/core';
import * as github from '@actions/github';

const NOTION_API_KEY = process.env.NOTION_API_KEY || core.getInput('NOTION_API_KEY');
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID || core.getInput('NOTION_DATABASE_ID');



async function run(){
    if (!NOTION_API_KEY) throw new Error("Notion Api key not found");
    if (!NOTION_DATABASE_ID) throw new Error("Notion Database ID not found");
}

run().catch((e: Error) => {
    console.error(e);
    core.setFailed(e.message);
})