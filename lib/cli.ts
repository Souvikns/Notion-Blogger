#!/usr/bin/env node

import { Command } from 'commander';
import { version } from '../package.json';
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
    .action((options) => {
        const NOTION_API_KEY = options.notionApiKey || process.env.NOTION_API_KEY;
        const NOTION_DATABASE_ID = options.notionDatabaseId || process.env.NOTION_DATABASE_ID;
        console.log(NOTION_API_KEY,NOTION_DATABASE_ID);
        console.log(process.cwd());
        const config = require(path.resolve(process.cwd(), options.config));
        console.log(config);
    })

program.parse(process.argv);
