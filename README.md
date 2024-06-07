# Node Word Games

Three command line games for node.

- Caesar Cipher
- Pig latin translator
- Rock, Paper, Scissors, (Spock, Lizard)

The Games can be installed via the command `npm install /path-to-game`

You can play it then from any directory with e.g `pig-node "Coding is fun!"`

If you want to do the same in your projects, you need this line on top of your file: `#! /usr/bin/env node`

And a `package.json` file in your project. (The node package manager npm can create an initial one for you with `npm init -y`)
Inside that `package.json` you need a `"bin"` field like that:

```JSON
"bin": {
    "pig-node": "./pig-latin.js"
  },
```

The key (`"pig-node"`) is the identifier you can use later on to run your program, the value (`"./pig-latin.js"`) is the path to the JavaSCript file you want to run.
