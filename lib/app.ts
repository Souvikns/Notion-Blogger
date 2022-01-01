import { NotionAdapter } from "./notion";
import {Blogger, BlogService} from './blogger';
import { NotionConfig } from './types';

export class NotionBlogger {
    private readonly notion: NotionAdapter
    private readonly blogger: Blogger;
    constructor(notionConfig: NotionConfig, blogServices: Array<BlogService>) {
        this.notion = NotionAdapter.instantiate(notionConfig);
        this.blogger = new Blogger(blogServices);
    }
    async post(): Promise<void> {
        const blogs = await this.notion.fetchBlogs();
        // publish the blogs and then update the status. 
        this.blogger.post(blogs);
    }
}