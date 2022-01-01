#!/usr/bin/env node

import { Command } from 'commander';
import { version } from '../package.json';
import { NotionBlogger } from './app';
import { generateBlogService } from './blogger';
import * as path from 'path';
const program = new Command();


program
    .name('notion-blogger')
    .addHelpCommand(false)
    .version(version, '-v, --version')

program
    .option('-c, --config <config-path>', "path to the config file")
    .option('--notion-api-key <api-key>', 'Notion integration api key')
    .option('--notion-database-id <database-id>', 'Notion database id')
    .option('--dev-api-key <api-key>', 'dev.to api key')
    .option('--hashnode-api-key <api-key>', 'Hashnode api key')
    .action(async (options) => {
        const NOTION_API_KEY = options.notionApiKey || process.env.NOTION_API_KEY;
        const NOTION_DATABASE_ID = options.notionDatabaseId || process.env.NOTION_DATABASE_ID;

        const notionBlogger = new NotionBlogger({
            api_key: NOTION_API_KEY,
            database_id: NOTION_DATABASE_ID
        }, [...generateBlogService({
            dev: options.devApiKey,
            hashnode: options.hashnodeApiKey
        })])
        try {
            await notionBlogger.post();
        } catch (error: any) {
            //console.log(error.message);
        }
    })

program.parse(process.argv);
