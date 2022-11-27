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

```
https://poepalette.vercep.app/?json=https://www.mysite.com/myjsonbookmarks.json&plugins=https://www.mysite.com/myplugins.json&theme=https://www.mysite.com/mycss.css
```

If you do not define those variables, POE will come with the default links, default plugins, and default style.

You can just change the default links, and stay with the default plugins and style... this will work just fine. But for more customization, you can change almost everything in POE.

## An easy way to fill the JSON data

We recomend using [opensheet.elk.sh](https://opensheet.elk.sh) to convert data stored in a Google Sheets document into JSON, on the fly. We use that in the default data for POE.

The default data used in POE is stored in [this Google Sheet](https://docs.google.com/spreadsheets/d/1Jim3mrmeO4Q1v84iX-S7TgjM28bnyGLRqnc1CXJWd8g/edit#gid=0).
The converted JSON file by opensheet.elk.sh [is this](https://opensheet.elk.sh/1Jim3mrmeO4Q1v84iX-S7TgjM28bnyGLRqnc1CXJWd8g/Reference).

Just set your Google Sheet document to "Everybody with the link can view", and give opensheet.elk.sh the Google Document ID (the `1Jim3mrmeO4Q1v84iX-S7TgjM28bnyGLRqnc1CXJWd8g` in the Google Sheet URL) plus the name of the spredsheet Tab ("Reference", in the default POE data Google Sheet). This is the complete URL:

```
https://opensheet.elk.sh/1Jim3mrmeO4Q1v84iX-S7TgjM28bnyGLRqnc1CXJWd8g/Reference
```

With this tool, you can easily change and manage all the links and plugins used in POE.

## JSON/Spreadsheets structure

[Bookmarks data structure](https://www.ranoya.com/aulas/tryit/markdown2/index.html?file=https://poepalette.vercel.app/docs/json.md&embed=plain)

[Plugins structure](https://www.ranoya.com/aulas/tryit/markdown2/index.html?file=https://poepalette.vercel.app/docs/json.md&embed=plain)

## CSS customization

[CSS variables](https://www.ranoya.com/aulas/tryit/markdown2/index.html?file=https://poepalette.vercel.app/docs/css.md&embed=plain)