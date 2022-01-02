import { NotionBlog, Services } from "./types";
import Axios from "axios";

export interface BlogService {
    name: string
    api_key: string
    post: (blog: NotionBlog, api_key: string) => Promise<void>
}

export class Blogger {
    private readonly blogServices: Services;
    constructor(blogServices: Services) {
        this.blogServices = blogServices;
    }

    async post(blog: NotionBlog, config: any) {
        for (const service of Object.keys(config)) {
            this.blogServices[service](blog, config[service]);
        }
    }
}