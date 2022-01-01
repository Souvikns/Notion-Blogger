import { NotionBlog } from "./types";
import Axios from "axios";

export interface BlogService {
    name: string
    api_key: string
    post: (blog: NotionBlog, api_key: string) => Promise<void>
}

export class Blogger {
    private readonly blogServices: Array<BlogService>;
    constructor(blogServices: Array<BlogService>) {
        this.blogServices = blogServices;
    }

    async post(blogs: Array<NotionBlog>) {
        for (const blog of blogs) {
            console.log(blog.content);
            for (const blogService of this.blogServices) {
                blogService.post(blog, blogService.api_key);
            }
        }
    }
}

export interface BlogServiceGen {
    dev?: string
    hashnode?: string
}

export function generateBlogService(service: BlogServiceGen): Array<BlogService> {
    const blogServices: Array<BlogService> = [];
    if (service.dev) {
        blogServices.push(devService(service.dev));
    }

    if (service.hashnode) {
        blogServices.push(hashnodeService(service.hashnode));
    }

    return blogServices;
}



function devService(api_key: string): BlogService {
    return {
        api_key: api_key,
        name: 'dev.to',
        post: async (blog: NotionBlog, api_key: string) => {
            const { status } = await Axios.post('https://dev.to/api/articles', { "article": {
                title: blog.title,
                published: false,
                body_markdown: blog.content,
                tags: blog.tags
            } }, {
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': api_key
                }
            });

            console.log(status)

        }
    }
}

function hashnodeService(api_key: string): BlogService {
    return {
        api_key,
        name: 'Hashnode',
        post: async (blog: NotionBlog, api_key: string) => {

        }
    }
}