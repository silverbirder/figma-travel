# figma-travel

figma-travel discovers arbitrary Nodes from Figma files. This is a personal toy.

## How to use

```
$ cp .env.local .env
```

Set your Figma PAT to FIGMA_API_PAT in .env.

```
$ node src/main.mjs -t <TEAM ID>
$ node src/main.mjs -p <PROJECT ID>
$ node src/main.mjs -f <FILE ID>
```
