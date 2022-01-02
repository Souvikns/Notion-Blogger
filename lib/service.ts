import { Services } from "./types";
import Axios from 'axios';
export default {
    dev: async (blog, config) => {
        var api_key;
        if (typeof config === 'string') {
            api_key = config
        }
        const { status } = await Axios.post('https://dev.to/api/articles', {
            "article": {
                title: blog.title,
                published: false,
                body_markdown: blog.content,
                tags: blog.tags
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'api-key': api_key || config.api_key
            }
        });
    },
    hashnode: async (blog, config) => {
        var api_key;
        if (typeof config === 'string') {
            api_key = config;
        }
        const { status } = await Axios({
            method: 'POST',
            url: 'https://api.hashnode.com/',
            headers: {
                'Content-Type': 'application/json',
                Authorization: api_key || config.api_key
            },
            data: JSON.stringify({
                query: 'mutation createStory($input: CreateStoryInput!){ createStory(input: $input){ code success message } }',
                variables: {
                    input: {
                        title: blog.title,
                        contentMarkdown: blog.content,
                        tags: [],
                        coverImageURL: blog.cover_image
                    }
                }
            })
        });
    }
} as Services