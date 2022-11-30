# Page and menu title

You can change them with the variable _title_ in the URL:

`https://poepalette.vercel.app/?title=Hello`

# CSS Variables

If you want to create a theme color for POE, you just need to set a few variables in a CSS file, and put it online:

```css
:root {
  --bg-color: #fef6e4;
  --line-separator: #efe8d6;
  --text-color: #616161;
  --color-link: #96a4a4;
  --color-hover: #63baa9;
  --input-text: #63baa9;
  --scroll-track: #ffffff00;
}
```

1. _--bg-color_ is the background color;
2. _--line-separator_ is the thin line between sections;
3. _--text-color_ is the color of group names, and other texts there are not the bookmark links;
4. _--color-link_ is the color of the bookmark links;
5. _--color-hover_ is the mouse over color of the bookmark links;
6. _--input-text_ is the color of the typed text in the input field;
7. _--scroll-track_ is the background color of the scroll bar space.

Create a new CSS file with just the _:root_ selector and the variables you want to customize, and load it with the _css_ variable of the URL:

`https://poepalette.vercel.app/?css=https://poepalette.vercel.app/dev/solarized.css`

## Customizing more than that

If you want to change more, like fonts, sizes, or grids, feel free to overwrite any selector in the original css. You can see all the classes and selectors used by POE at it's CSS file [here](https://poepalette.vercel.app/dev/style.css).
