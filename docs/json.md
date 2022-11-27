# The data structure

The bookmarks json uses four JSON Keys for storing each registry:

| Key   | Description                                                                                             | Type of Data                                                                             | Example                          |
| ----- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------- |
| Name  | The name of the bookmark                                                                                | Text                                                                                     | My Website                       |
| Link  | The URL of the bookmark                                                                                 | A complete URL                                                                           | https://www.github.com           |
| Group | Tags used to organize bookmarks in categories                                                           | Words (tags), separated by comma (you can use multiple categories for a single bookmark) | documentation,reference,snippets |
| Type  | How POE will open the link: in a new window, in the same window, or embeding the link inside POE itself | leave it blank for new window, use _self_ for same window and _embed_ for embeding       | self                             |

This is the JSON generated from the default data (in [this spreadsheet](https://docs.google.com/spreadsheets/d/1Jim3mrmeO4Q1v84iX-S7TgjM28bnyGLRqnc1CXJWd8g/edit#gid=0)):

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

Any other JSON Keys and data you fill in your JSON file or Google Sheet will be searchable by POE, and will be found by the query. So, if you want complementary information about your links to help find things, just create more Keys/Columns in your data and fill it with what you want (and this a life saver with long lists, since relative and reference words will bring the link up for you. Do it and thank me later...)

Just look into the JSON data that the link "This data (in Spreedsheet)" has and Key "Other Info 2" filled with the information "Source List". So, if you type "Source L" in POE with the default data, the "This data (in Spreedsheet)" will show up.
