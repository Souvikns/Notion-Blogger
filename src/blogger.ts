import {HashnodeArticle, DevArticle} from './type';
import Axios from 'axios';


export class Blogger {
    private readonly dev_token?: string;
    private readonly hashnode_token?: string;

    constructor(token: {dev?: string, hashnode?: string}) {
        this.dev_token = token.dev;
        this.hashnode_token = token.hashnode;
    }

    postTo = {
        dev: async (article: DevArticle) => {
            if(!this.dev_token) return;

            const response = await Axios.post('', article, {
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': this.dev_token
                }
            });

        },
        hashnode: async (article: HashnodeArticle) => {
            if (!this.hashnode_token) return;

            //TODO: call hashnode api to publish. 
        }
    }
}