<div align="center">

<h1>Notion Blogger</h1>

</div>

Notion Blogger is a small script that helps you blog right from Notion itself. So you never leave notion and all your blogs are published to different services. 

## Installation 
```
npm install @notionhq/notion-blogger
```

## Using `Notion-Blogger` as a library
`Notion-Blogger` can be easily used within your javascript projects as a Node.js module. It is also easy to use. 

```ts
import NotionBlogger from '@integrateme/notion-blogger'

const notionBlogger = new NotionBlogger({
    notion: {
        api_key: 'notion-api-key',
        database_id: 'notion-database-id'
    }
})

await notionBlogger.publish({
    dev: 'dev-api-key',
    hashnode: 'hashnode-api-key'
});

```

