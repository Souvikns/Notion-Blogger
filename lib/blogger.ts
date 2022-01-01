import { NotionBlog } from "./types";

export interface BlogService {
    name: string
    api_key: string
    post: (blog: NotionBlog) => void
}

export class Blogger {
    private readonly blogServices: Array<BlogService>;
    constructor(blogServices: Array<BlogService>) {
        this.blogServices = blogServices;
    }

    async post(blogs: Array<NotionBlog>, cb: (page_id: string) => Promise<void>) {
        for (const blog of blogs) {
            for (const blogService of this.blogServices) {
                blogService.post(blog);
            }
            cb(blog.id);
        }
    }
}

export const blogServices: Array<BlogService> = [
    {
        name: 'dev.to',
        api_key: process.env.DEV_API_KEY || '',
        post: (blog: NotionBlog) => {

        }
    },
    {
        name: 'hashnode',
        api_key: process.env.HASHNODE_API_KEY || '',
        post: (blog: NotionBlog) => {

        }
    }
]