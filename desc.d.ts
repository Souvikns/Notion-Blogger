declare module "notion-to-md" {
    export default class Notion2md {
        constructor({notionClient}: {notionClient: any});
        pageToMarkdown(page_id: string): Array<any>;
        toMarkdownString(mdBlocks: Array<any>): string;
    }
}