# Poe

## What is POE?

Everyone who uses a modern text editor for coding is familiar with a Command Palette, right? (...right???)

If you don't know what a Command Palette is, it started with [Sublime Text](https://www.sublimetext.com/). Pressing CTRL+SHIFT+P (or CMD+SHIFT+P on Macs) on Sublime (or VSCode too) would brings up a modal window where you could just start typing what you need and everything related would appear. The need to wonder where all the options and tools were in the menu have ended there.

When you get used to it, you want everything to start working just like that.

POE is just that for handling all your web bookmarks. I'm sure you have a long list of them, don't you?... going back to the Del.ici.ous days, I assume...

### And that's not all...

POE is also extensible. You can code your own javascript functions to trigger within it, and render whatever you want within it. From the latest news available in the RSS feeds of your favorite websites, to information from other databases that you may find useful.

### Don't worry

Everything is free, and always will be, as long as it is not used for commercial purposes. The code is open source and available on [Github](https://www.github.com/ranoya/poepalette).

## Usign POE

Two ways to use POE:

1. Cloning the [github repo](https://github.com/ranoya/poepalette), and implementing it where (and how) you want.
2. Using the [POE instance in Vercel](https://poepalette.vercel.app) with your own data (nothing is collected).

### Using the online instance with your data

Four URL variables are received containing all the data POE will show:

1. _json_ variable, with json data of all bookmarks;
2. _plugins_ variable (optional), with json data of all plugins you want to use (called with the _/_ operator);
3. _theme_ variable (optional), with a css URL to overhide the original POE style;
4. _files_ variable (optional), witha json data of working files opened in cloud services (called with the _@_ operator);

Example:

`https://poepalette.vercep.app/?json=https://www.mysite.com/myjsonbookmarks.json&plugins=https://www.mysite.com/myplugins.json&theme=https://www.mysite.com/mycss.css&files=https://www.mysite.com/myactualwork.json`

If you do not define those variables, POE will come with the default links, default plugins, and default style, and no working files to quick access.

Well... just see for youself: [https://poepalette.vercel.app](https://poepalette.vercel.app).

You can just change the default links, and stay with the default plugins and style... this will work just fine. But for more customization, you can change almost everything in POE.

## Using Plugins

To use a plugin inside POE, just type "/" and the name of the desired function loaded with the plugins.

Two plugins (_/groups_ and _/params_) comes with the default data for example purposes, and a third one can be loaded with a specific plugins JSON already avaliable.

If you type _/groups [string]_ in POE with the default data and plugins, it will show all the categories organizing the bookmarks; if you type _/params [string]_ it will echo the _[string]_ you write.

You can create your own plugins to extend functionalities of POE.

If you want to see a nice way to use plugins, load [this version](https://poepalette.vercel.app?plugins=https://opensheet.elk.sh/1gvNjBqO-8ji2Y52MqllpLWatwXltqzCb99i-D0kgXL4/Custom) with the _/Games_ plugin, and type _/games fps_.

### An easy way to fill the JSON data

We recomend using [opensheet.elk.sh](https://opensheet.elk.sh) to convert data stored in a Google Sheets document into JSON, on the fly. We use that in the default data for POE.

The default data used in POE is stored in [this Google Sheet](https://docs.google.com/spreadsheets/d/1Jim3mrmeO4Q1v84iX-S7TgjM28bnyGLRqnc1CXJWd8g/edit#gid=0).
The converted JSON file by opensheet.elk.sh [is this](https://opensheet.elk.sh/1Jim3mrmeO4Q1v84iX-S7TgjM28bnyGLRqnc1CXJWd8g/Reference).

![Google Sheet used in the default data](https://poepalette.vercel.app/docs/googlesheetimg.png)

Just set your Google Sheet document to "Everybody with the link can view", and give opensheet.elk.sh the Google Document ID (the `1Jim3mrmeO4Q1v84iX-S7TgjM28bnyGLRqnc1CXJWd8g` in the Google Sheet URL) plus the name of the spredsheet Tab ("Reference", in the default POE data Google Sheet). This is the complete URL:

`https://opensheet.elk.sh/1Jim3mrmeO4Q1v84iX-S7TgjM28bnyGLRqnc1CXJWd8g/Reference`

With this tool, you can easily change and manage all the links and plugins used in POE. It will create the JSON below for you:

```json
[
  {
    "Name": "Using POE",
    "Link": "https://www.ranoya.com/aulas/tryit/markdown2/index.html?file=https://poepalette.vercel.app/docs/using.md&embed=plain",
    "Group": "Docs",
    "Type": "embed"
  },
  {
    "Name": "Working App",
    "Link": "https://poepalette.vercel.app",
    "Group": "Apps",
    "Type": "self"
  },
  {
    "Name": "Working App with Games Plugin",
    "Link": "https://poepalette.vercel.app?plugins=https://opensheet.elk.sh/1gvNjBqO-8ji2Y52MqllpLWatwXltqzCb99i-D0kgXL4/Custom",
    "Group": "Apps, Examples",
    "Type": "self",
    "Other Info 1": "Games plugin installed"
  },
  {
    "Name": "This data (in Spreedsheet)",
    "Link": "https://docs.google.com/spreadsheets/d/1Jim3mrmeO4Q1v84iX-S7TgjM28bnyGLRqnc1CXJWd8g/edit#gid=0",
    "Group": "Data",
    "Type": "",
    "Other Info 1": "Google Sheets",
    "Other Info 2": "Source List"
  },
  {
    "Name": "GitHub",
    "Link": "https://github.com/ranoya/poepalette",
    "Group": "Apps, Code, Source"
  },
  {
    "Name": "Latin America University Rankings",
    "Link": "https://www.timeshighereducation.com/world-university-rankings/2021/latin-america-university-rankings#!/page/0/length/25/sort_by/rank/sort_order/asc/cols/undefined",
    "Group": "Other Examples, University, Rankings"
  },
  {
    "Name": "Research Gate",
    "Link": "https://www.researchgate.net/",
    "Group": "Other Examples, University"
  },
  {
    "Name": "OrcID",
    "Link": "http://orcid.org",
    "Group": "Other Examples, University"
  }
]
```

### The data structure

The bookmarks json uses four JSON Keys for storing each registry:

| Key   | Description                                                                                             | Type of Data                                                                             | Example                          |
| ----- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------- |
| Name  | The name of the bookmark                                                                                | Text                                                                                     | My Website                       |
| Link  | The URL of the bookmark                                                                                 | A complete URL                                                                           | https://www.github.com           |
| Group | Tags used to organize bookmarks in categories                                                           | Words (tags), separated by comma (you can use multiple categories for a single bookmark) | documentation,reference,snippets |
| Type  | How POE will open the link: in a new window, in the same window, or embeding the link inside POE itself | leave it blank for new window, use _self_ for same window and _embed_ for embeding       | self                             |

Any other JSON Keys and data you fill in your JSON file or Google Sheet will be searchable by POE, and will be found by the query. So, if you want complementary information about your links to help find things, just create more Keys/Columns in your data and fill it with what you want (and this a life saver with long lists, since relative and reference words will bring the link up for you. Do it and thank me later...)

Just look into the JSON data that the link "This data (in Spreedsheet)" has and Key "Other Info 2" filled with the information "Source List". So, if you type "Source L" in POE with the default data, the "This data (in Spreedsheet)" will show up.

### Plugins data structure

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

## Working Files in Cloud Services

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
