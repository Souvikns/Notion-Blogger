import { HashnodeArticle, DevArticle, ArticlePublishResponse } from './type';
import { DevtoError } from './errors';
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
                const { status } = await Axios.post('https://dev.to/api/articles', article, {
                    headers: {
                        'Content-Type': 'application/json',
                        'api-key': this.dev_token
                    }
                });
                return { status, message: `${article.title} was successfully published` };
            } catch (error) {
                throw new DevtoError();
            }
        },
        hashnode: async (article: HashnodeArticle) => {
            if (!this.hashnode_token) return;

            //TODO: call hashnode api to publish. 
        }
    }
}