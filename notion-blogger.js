const { Client } = require('@notionhq/client');
const notion2md = require('notion-to-md');
const axios = require('axios').default;

const publishToDev = async (token, { title, content, main_image, description, series, tags, published }) => {
    if(typeof published === 'undefined') {
        published = false;
    }
    const Article = {
        "article": {
            "title": title,
            "published": false,
            "body_markdown": content,
            "main_image": main_image,
            "description": description,
            "series": series,
            "tags": tags
        }
    }
    const response = await axios.post('https://dev.to/api/articles', Article, {
        headers: {
            'Content-Type': 'application/json',
            'api-key': token
        }
    })

    return response.status;
}

const publishToHashnode = async (token, {title, content}) => {
    // make a request to hashnode API and publish the article

}


async function main(auth_token, database_id, options = {dev_api_key, hashnode_api_key}) {
    if (typeof auth_token === 'undefined') {
        throw new Error("auth_token is missing");
    }
    if (typeof database_id === 'undefined') {
        throw new Error("database_id is missing");
    }
    if(typeof options.dev_api_key === 'undefined') {
        throw new Error("dev api key missing");
    }
    if(typeof options.hashnode_api_key === 'undefined') {
        throw new Error("hashnode api key is missing");
    }

    const notion = new Client({ auth: auth_token });
    /**
     * We fetch pages having status as `ready-to-publish`
     */

    const pages = await notion.databases.query({
        database_id,
        filter: {
            and: [
                { property: 'status', select: { equals: 'ready-to-publish' } }
            ]
        }
    });
    if (pages.results.length === 0) {
        console.log("No Pages ready to be published");
        return;
    }

    console.log('publishing blogs');
    const n2m = new notion2md({ notionClient: notion });
    for (let page of pages.results) {
        // extract markdown and publish it to dev and hashnode
        const title = page.properties.Name;
        const cover_image = page.properties['Cover Image'];
        const description = page.properties['Description'];
        const series = page.properties['series'];
        const tags = page.properties['Tags'];
        const published = page.properties['Published'];
        const mdBlocks = await n2m.pageToMarkdown(page.id);
        const content = n2m.toMarkdownString(mdBlocks);
        
    }

}

module.exports = main