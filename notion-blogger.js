const { Client } = require('@notionhq/client');
const notion2md = require('notion-to-md');
const axios = require('axios').default;

const publishToDev = async (token, { title, content, main_image, description, series, tags, published }) => {
    if (typeof published === 'undefined') {
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
    try {
        const response = await axios.post('https://dev.to/api/articles', Article, {
            headers: {
                'Content-Type': 'application/json',
                'api-key': token
            }
        })
        return true;
    } catch (error) {
        return false;
    }


    return response.status;
}

const publishToHashnode = async (token, { title, contentMarkdown, slug, coverImageURL, tags, }) => {
    // make a request to hashnode API and publish the article

}

const getPageContent = (page) => {
    const id = page.id;
    const cover_image = page.cover.external.url;
    const title = page.properties.Name.title[0].plain_text;
    const description = page.properties.Description.rich_text[0].plain_text;
    const tags = page.properties.Tags.multi_select.map(s => s.name);
    const series = page.properties.Series.rich_text[0].plain_text;
    return {
        id, cover_image, title, description, tags, series
    }
}


async function main(auth_token, database_id, options = { dev_api_key, hashnode_api_key }) {
    if (typeof auth_token === 'undefined') {
        throw new Error("auth_token is missing");
    }
    if (typeof database_id === 'undefined') {
        throw new Error("database_id is missing");
    }
    if (typeof options.dev_api_key === 'undefined') {
        throw new Error("dev api key missing");
    }
    if (typeof options.hashnode_api_key === 'undefined') {
        throw new Error("hashnode api key is missing");
    }

    const notion = new Client({ auth: auth_token });
    /**
     * We fetch pages having status as `ready-to-publish`
     */

    const response = await notion.databases.query({
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
    const pages = response.results.map(getPageContent);
    const n2m = new notion2md({ notionClient: notion });
    for (let page of pages) {
        const mdBlocks = await n2m.pageToMarkdown(page.id);
        const content = n2m.toMarkdownString(mdBlocks);

        const isPublishedToDev = await publishToDev(options.dev_api_key, {
            title: page.title,
            content: content,
            description: page.description,
            main_image: page.cover_image,
            published: true,
            series: page.series,
            tags: page.tags
        });

        // After we have successfully published the blog in both the website. 

        try {
            const res = await notion.pages.update({
                page_id: page.id,
                properties: {
                    'status': {
                        select: { name: 'published' }
                    }
                }
            })
            console.log(`${page.id} successfully updated in notion`);
        } catch (error) {
            console.log(`${page.id} was not updated in notion`);
        }
    }

}

module.exports = main