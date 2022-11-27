# How to write plugins?

It's ease for ease things, and hard for hard things (duh...).

First, you'll have to put your javascript file, containing your plugin code, online in a webserver. Services like [Github](https://github.com) or [Vercel](https://www.vercel.app) can help with that, if you don't have access to an online webserver yourself.

The function typed in POE (the _/function_) must have the same name of the javascript functio, but without the "/". So, this is the code for the _/params [string]_ function loaded by default in POE:

```js
params = function (par) {
  let xpto = `<div class="outputgrid">`;
  xpto += par;
  xpto += `</div>`;

  present(xpto);
};
```

All plugins receive one sigle variable from POE. You can call it `par`, or whatever you like. This is the _String_ you type after the function in POE input.

The last function in the code, the _present(xpto)_ puts the HTML code your plugin generates inside POE window. So, after your are done constructing what you need to be rendered in HTML inside POE, just send it to _present()_ function. The _outputgrid_ CSS class is the grid dividing all the bookmarks in POE. You don't have to use it, if you don't want to display information in the grid used by default for the bookmarks.

## Something more useful

So, let's see the _/Games [string]_ function, that will load a differente JSON/Spreadsheet, and search for links there (you can use POE with the _/Games_ plugin loaded, in [this link](https://poepalette.vercel.app/?plugins=https://opensheet.elk.sh/1gvNjBqO-8ji2Y52MqllpLWatwXltqzCb99i-D0kgXL4/Custom)):

```js
let games = function (par) {
  fetch(
    `https://opensheet.elk.sh/1YdEW-JTZ9W3MB_gaJ2x5svEVs5gJXfb0d_QxkPL16d4/List`
  )
    .then((response) => response.json())
    .then((dados) => {
      let newarr = select(dados, multipatterncheck_exclude, par);
      let xpto = `<div class="outputgrid">`;

      for (let i = 0; i < newarr.length; i++) {
        xpto += `<a target='_blank' href='javascript:setinput("${newarr[i].link}")'>${newarr[i].game}`;
      }

      xpto += `</div>`;
      present(xpto);
    });
};
```

This code will first fetch the Games JSON, and, after that, use a _select_ function from the [DataT library](https://github.com/ranoya/DataT) already avaliable inside POE. The `let newarr = select(dados, multipatterncheck_exclude, par);` whill create a new array with data filtered by a String, wich is the String passed to the function after _/Games .../_ (We call it _par_, but you name yours what you prefer). After writing multiple `<a>` tags with each link, the list is passed to the _present()_ function to be shown. This kind of code is very common if you are used to fetch JSONs in javascript, and use Arrays and Objects.

If you can't understand what this code does, but still want to create subsearches for your own bookmarks, just change the code with what you need, and it will work fine:

```js
let MYFUNCTIONNAME = function (par) {
  fetch(`MYSPREADSHEET-JSON-URL`)
    .then((response) => response.json())
    .then((dados) => {
      let newarr = select(dados, multipatterncheck_exclude, par);
      let xpto = `<div class="outputgrid">`;

      for (let i = 0; i < newarr.length; i++) {
        xpto += `<a target='_blank' href='javascript:setinput("${newarr[i].link}")'>${newarr[i].game}`;
      }

      xpto += `</div>`;
      present(xpto);
    });
};
```

(Yes... really... it's just that for you to create multiples and independent sub-bookmarks)

![Google Sheet with plugins](https://poepalette.vercel.app/docs/googlesheetpluginsimg.png)

After puting your code somewhere online, you have to create a JSON for all the plugins you want to load in POE.
If they are few, just write the JSON file and put it online too. If you will use a lot of them, it seems easier to create a Spreadsheet with them.

This is the JSON file for plugins, if you prefer. Just put every plugin in the JSON.

```json
[
  { "instruction": "params", "js": "./dev/showparams.js" },
  { "instruction": "groups", "js": "./dev/groups.js" },
  { "instruction": "games", "js": "./dev/games.js" },
  {
    "instruction": "MYFUNCTIONNAME",
    "js": "https://www.MYDOMAIN.com/mypluginjsfile.js"
  }
]
```

Last but not least, load this JSON file (or the Spreadsheet containing all the links with opensheet.elk.sh) in the _plugins_ variable of the POE URL:

`https://poepalette.vercel.app?plugins=https://www.MYDOMAIN.com/ALLPLUGINS.json`

Have fun.
