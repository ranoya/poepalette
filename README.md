# Poe

# What is POE?

Everyone who uses a modern text editor for coding is familiar with a Command Palette, right? (...right???)

If you don't know what a Command Palette is, it started with [Sublime Text](https://www.sublimetext.com/). Pressing CTRL+SHIFT+P (or CMD+SHIFT+P on Macs) on Sublime would brings up a modal window where you could just start typing what you need and everything related would appear. The need to wonder where all the options and tools were in the menu have ended there.

When you get used to it, you want everything to start working just like that.

POE is just that for handling all your web bookmarks. I'm sure you have a long list of them, don't you?... going back to the Del.ici.ous days, I assume...

## And this is not all...

POE is also extensible. You can code your own javascript functions to trigger within it, and render whatever you want within it. From the latest news available in the RSS feeds of your favorite websites, to information from other databases that you may find useful.

## Don't worry

Everything is free, and always will be, while it's not used for commercial purpouses. The code is open source, and it's avaliable at [Github](https://www.github.com/ranoya/poepalette).

# Usign POE

Two ways of using POE:

1. Cloning the [github repo](https://github.com/ranoya/poepalette), and implementing it where (and how) you want.
2. Using the [POE instance in Vercel](https://poepalette.vercel.app) with your own data (nothing is collected).

## Using the online instance with your data

Three URL variables are received containing all the data POE will show:

1. _json_ variable, with json data of all bookmarks;
2. _plugins_ variable, with json data of all plugins you want to use;
3. _theme_ variable, with a css URL to overhide the original POE style;

Example:

`https://poepalette.vercep.app/?json=https://www.mysite.com/myjsonbookmarks.json&plugins=https://www.mysite.com/myplugins.json&theme=https://www.mysite.com/mycss.css`

If you do not define those variables, POE will come with the default links, default plugins, and default style.

You can just change the default links, and stay with the default plugins and style... this will work just fine. But for more customization, you can change almost everything in POE.

## An easy way to fill the JSON data

We recomend using [opensheet.elk.sh](https://opensheet.elk.sh) to convert data stored in a Google Sheets document into JSON, on the fly. We use that in the default data for POE.

The default data used in POE is stored in [this Google Sheet](https://docs.google.com/spreadsheets/d/1Jim3mrmeO4Q1v84iX-S7TgjM28bnyGLRqnc1CXJWd8g/edit#gid=0).
The converted JSON file by opensheet.elk.sh [is this](https://opensheet.elk.sh/1Jim3mrmeO4Q1v84iX-S7TgjM28bnyGLRqnc1CXJWd8g/Reference).

Just set your Google Sheet document to "Everybody with the link can view", and give opensheet.elk.sh the Google Document ID (the `1Jim3mrmeO4Q1v84iX-S7TgjM28bnyGLRqnc1CXJWd8g` in the Google Sheet URL) plus the name of the spredsheet Tab ("Reference", in the default POE data Google Sheet). This is the complete URL:

`https://opensheet.elk.sh/1Jim3mrmeO4Q1v84iX-S7TgjM28bnyGLRqnc1CXJWd8g/Reference`

With this tool, you can easily change and manage all the links and plugins used in POE.

## The data structure

The bookmarks json uses four JSON Keys for storing each registry:

| Key   | Description                                                                                             | Type of Data                                                                             | Example                          |
| ----- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------- |
| Name  | The name of the bookmark                                                                                | Text                                                                                     | My Website                       |
| Link  | The URL of the bookmark                                                                                 | A complete URL                                                                           | https://www.github.com           |
| Group | Tags used to organize bookmarks in categories                                                           | Words (tags), separated by comma (you can use multiple categories for a single bookmark) | documentation,reference,snippets |
| Type  | How POE will open the link: in a new window, in the same window, or embeding the link inside POE itself | leave it blank for new window, use _self_ for same window and _embed_ for embeding       | self                             |

Any other JSON Keys and data you fill in your JSON file or Google Sheet will be searchable by POE, and will be found by the query. So, if you want complementary information about your links to help find things, just create more Keys/Columns in your data and fill it with what you want.
