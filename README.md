<div align="center">

<h3>Notion Blogger</h3>

<br>

<p>
Blog to multiple platform right from Notion. 
</p>

</div>


## Usage 
It is preferred that you use this service as a cron job. 


```yaml 
name: Notion Blogger 
on:
    schedule:
        - cron: '*/20 * * * *'

jobs:
    notion-blogger:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2
            - name: Notion Blogger
              uses: Integrateme/Notion-Blogger@latest
              env:
                NOTION_API_KEY: ${{secrets.NOTION_API_KEY}}
                NOTION_DATABASE_ID: ${{secrets.NOTION_DATBASE_ID}}


```