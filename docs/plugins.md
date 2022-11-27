# Plugins data structure

The plugins json is even more simplier: just two JSON Keys.

| Key         | Description                                                                        | Type of Data               | Example                                   |
| ----------- | ---------------------------------------------------------------------------------- | -------------------------- | ----------------------------------------- |
| instruction | the name of the function to be called in POE and executed (it have to be the same) | a javascript function name | groups                                    |
| js          | the URL of a javascript file containing the function                               | Just a URL                 | https://poepalette.vercel.ap/dev/games.js |

To use a plugin inside POE, just type "/" and the name of the desired function.

For instance, two plugins comes with the default data: _/groups_ and _/params_.

If you type _/groups [string]_ in POE with the default data and plugins, it will show all the categories organizing the booksmarks; if you type _/params [string]_ it will echo the _[string]_ you write.

![Google Sheet used to include games plugin](https://poepalette.vercel.app/docs/googlesheetpluginsimg.png)

```json
[
  { "instruction": "params", "js": "./dev/showparams.js" },
  { "instruction": "groups", "js": "./dev/groups.js" },
  { "instruction": "games", "js": "./dev/games.js" }
]
```

Another example of plugin can be loaded with a different [plugins JSON](https://opensheet.elk.sh/1gvNjBqO-8ji2Y52MqllpLWatwXltqzCb99i-D0kgXL4/Custom) from [this spreadsheet](https://docs.google.com/spreadsheets/d/1gvNjBqO-8ji2Y52MqllpLWatwXltqzCb99i-D0kgXL4/edit#gid=0). This one have a _/games [string]_ that will search for online games in a [thrid/external spreadsheet/JSON](https://docs.google.com/spreadsheets/d/1YdEW-JTZ9W3MB_gaJ2x5svEVs5gJXfb0d_QxkPL16d4/edit#gid=0) below!

![Google Sheet used to include games plugin](https://poepalette.vercel.app/docs/googlesheetgamesimg.png)

And if you have basic knowledge of javascript, writing these kind of plugins is an easily job.
