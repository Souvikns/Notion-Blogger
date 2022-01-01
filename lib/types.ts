export interface NotionConfig {
    api_key: string
    database_id: string
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