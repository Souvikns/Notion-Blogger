import { HashnodeArticle, DevArticle, ArticlePublishResponse } from './type';
import { DevtoError, HashnodeError } from './errors';
import Axios from 'axios';


export class Blogger {
    private readonly dev_token?: string;
    private readonly hashnode_token?: string;

    constructor(token: { dev?: string, hashnode?: string }) {
        this.dev_token = token.dev;
        this.hashnode_token = token.hashnode;
    }

    postTo = {
        dev: async (article: DevArticle): Promise<ArticlePublishResponse> => {
            if (!this.dev_token) throw new Error('Missing dev.to token');
            try {
                const { status } = await Axios.post('https://dev.to/api/articles', {"article": article}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'api-key': this.dev_token
                    }
                });
                return { status, message: `${article.title} was successfully published` };
            } catch (error) {
                throw error
            }
        },

        hashnode: async (article: HashnodeArticle): Promise<ArticlePublishResponse> => {
            if (!this.hashnode_token) throw new Error("Hashnode token in not present");
            const hashnode_api = 'https://api.hashnode.com/';
            try {
                const { status } = await Axios.post(hashnode_api, {
                    query: "mutation createStory($input: CreateStoryInput!){ createStory(input: $input){ code success message } }",
                    variables: {
                        input: {
                            title: article.title,
                            contentMarkdown: article.contentMarkdown,
                            coverImageURL: article.coverImageURL
                        }
                    }
                }, {
                    "headers": {
                        "Content-Type": "application/json",
                        Authorization: this.hashnode_token
                    }
                });
                return { status, message: `${article.title} was succesfully published` };
            } catch (error) {
                throw new HashnodeError();
            }

        }
    }
}