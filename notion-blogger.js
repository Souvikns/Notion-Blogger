const { Client } = require('@notionhq/client');
const notion2md = require('notion-to-md');
const axios = require('axios').default;

const publishToDev = async (token, { title, content }) => {
    const Article = {
        "article": {
            "title": title,
            "published": false,
            "body_markdown": content,
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


async function main(auth_token, database_id) {
    if (typeof auth_token === 'undefined') {
        throw new Error("auth_token is missing");
    }
    if (typeof database_id === 'undefined') {
        throw new Error("database_id is missing");
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
        const mdBlocks = await n2m.pageToMarkdown(page.id);
        const content = n2m.toMarkdownString(mdBlocks);
        
    }

}

module.exports = main