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