notion-blogger / [Exports](modules.md)

<div align="center">

<h1>Notion Blogger</h1>

</div>

Notion Blogger is a small script that helps you blog right from Notion itself. So you never leave notion and all your blogs are published to different services. 

## Installation 
```
npm install notion-blogger
```

## Usage
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
Notion Blogger out of the box supports only `dev.to` and `Hashnode` services as of now, all you have to do is pass in the API key of the service you want the applicatin to post. So if you want to just publish your blog to `dev.to` just do this 

```ts
await notionBlogger.publish({
    dev: 'dev-api-key'
})
```

### How can I publish to other services. 
Notion Blogger was made with extension in mind, you can add custom service logic while instantiating `NotionBlogger` class. 

```ts
const notionBlogger = new NotionBlogger({
    notion: {
        api_key: 'notion-api-key',
        database_id: 'notion-database-id',
    },
    services: {
        medium: async (blog: NotionBlog, config: string | any) => {
            // Here you can add your custom logic for publishing article in medium. 
        }
    }
})
```
#### `blog`

`blog` variable is the properties from the Notion Database that you can use to post to your service of choice. 

|Variable|Type|
|--------|----|
|blog.id | `string`|
|blog.cover_image| `string`|
|blog.title| `string`|
|blog.description| `string`|
|blog.tags| `Arrary<string>

#### `config`
`config` variable is the variable that you pass in `publish` function. So you can pass in only the `api-key` and that what the config varaible will be, or you if you pass in your custom properties you can access them as well. 

```ts
await notionBlogger.publish({
    medium: 'api-key'
})

or 

await notionBlogger.publish({
    medium: {
        api_key: `api_key`,
        "some-custom-property": "that you want to access in your custom function"
    }
})
```
