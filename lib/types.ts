import { Client } from "@notionhq/client";

export interface NotionConfig {
    api_key: string
    database_id: string
    notionClient?: Client
}

export interface NotionBlog {
    id: string
    cover_image: string
    title: string
    description: string
    tags: string[]
    series: string
    content: string
}

export interface PublishConfig {
    [key: string]: string | any
}

export type Services = {
    [name: string]: (blog: NotionBlog, config: any) => Promise<void>
};

export interface Config {
    notion: NotionConfig
    log?: boolean,
    services?: Services
}