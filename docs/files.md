# Working Files in Cloud Services

The @ operator is a shortcut to access your working files stored online, organized by the service ou platform where it is stored.

The json file uses 3 keys for each document you want to have a quick access:

| Key     | Description                                        | Type of Data                                                           | Example                                                                                        |
| ------- | -------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Name    | Name of the document                               | The name you prefer (don't have to be the same as the proper document) | My Finances                                                                                    |
| Link    | The full URL to the document                       | An URL address                                                         | https://docs.google.com/spreadsheets/d/1Jim3mrmeO4Q1v84iX-S7TgjM28bnyGLRqnc1CXJWd8g/edit#gid=0 |
| Service | A name for the service to call with the @ operator | a word                                                                 | googlesheet                                                                                    |

When used, the @ operator will first search by the services registered in the json file; then, when one of the services is identified, it will look for the links associated with this service.

![Google Sheet used to include all POE documentation](https://poepalette.vercel.app/docs/googlesheetcloudfiles.png)

You can try the @ operator with that data in [this example](https://poepalette.vercel.app?files=https://opensheet.elk.sh/1M-je8SVNvSQcMt52bV_UJ28ISuifHlvZL11oFa5Jo1s/WorkingOn).
