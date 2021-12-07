require('dotenv').config;
const NotionBlogger = require('../notion-blogger');


NotionBlogger(process.env.NOTION_ACCESS_KEY, process.env.DATABASE_ID)
    .catch(e => console.error(e));
