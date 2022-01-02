import { NotionAdapter } from "./notion";
import { Blogger, } from './blogger';
import { Config, PublishConfig } from './types';
import services from './service';


export class NotionBlogger {
    private readonly notion: NotionAdapter
    private readonly blogger: Blogger;
    constructor(config: Config) {
        this.notion = NotionAdapter.instantiate(config.notion);
        if (!config.services) {
            this.blogger = new Blogger(services);
        } else {
            this.blogger = new Blogger({
                ...services,
                ...config.services
            });
        }

    }

    async publish(config: PublishConfig) {
        const blogs = await this.notion.fetchBlogs();
        for (const blog of blogs) {
            await this.blogger.post(blog, config);
            this.notion.updateBlogStatus(blog.id);
        }
    }
}