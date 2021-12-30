export interface NotionPage {
    id: string,
    title: string,
    cover_image: string,
    description: string,
    tags: string[],
    series: string
}

export interface NotionAdapterInput {
    api_key?: string,
    database_id?: string
}

export interface DevArticle {
    title: string,
    body_markdown: string,
    main_image?: string,
    description?: string,
    series?: string,
    tags?: Array<string>
    publish?: boolean
}

export interface HashnodeArticle {
    title: string,
    contentMarkdown: string,
    coverImageURL?: string,
    tags?: string
    slug?: string,
}

export interface ArticlePublishResponse {
    status: number,
    message: string
}