#POE Instance

Poe Instance is a simple way to implement POE inside any website. You can see it [running here](https://poepalette.vercel.app/docs/poeinstanceexample.html).

To implement POE Instance in your website, you can use the javascript code below, where _JSON_ is the URL of your links, _CSS_ is the URL for style customization (it's optional), and _plugins_ is the URL to include Plugins (also optional):

```html
<script src="https://poepalette.vercel.app/poeinstance.js"></script>
<script>
  startpoe(JSON, CSS, PLUGINS);
</script>
```

This code is used in the [example](https://poepalette.vercel.app/docs/poeinstanceexample.html):

```html
<script src="https://poepalette.vercel.app/poeinstance.js"></script>
<script>
  startpoe(
    "https://opensheet.elk.sh/10wpfmMWn3igQF4rJBYCo8OR90igO1tfKwcmrot0ult0/CodeEditors",
    "https://poepalette.vercel.app/dev/bigblue.css",
    "https://opensheet.elk.sh/10wpfmMWn3igQF4rJBYCo8OR90igO1tfKwcmrot0ult0/POEPlugins"
  );
</script>
```

All the data structure is exactly the same used for the full POE version. You can check the [JSON bookmarks data structure](https://www.ranoya.com/aulas/tryit/markdown2/index.html?file=https://poepalette.vercel.app/docs/json.md&embed=plain), the [Plugin data structure](https://www.ranoya.com/aulas/tryit/markdown2/index.html?file=https://poepalette.vercel.app/docs/plugins.md&embed=plain) and the [CSS Customization](https://www.ranoya.com/aulas/tryit/markdown2/index.html?file=https://poepalette.vercel.app/docs/css.md&embed=plain) in the documents linked.
