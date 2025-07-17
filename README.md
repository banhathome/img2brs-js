# img2brs.js

[![npm package][npm-badge]][npm]

[npm-badge]: https://img.shields.io/npm/v/img2brs.svg
[npm]: https://www.npmjs.org/package/img2brs

JS library to convert images into Brickadia save files (.brs). Compatible with both Node.js (WIP) and browser environments.

(JS version of [img2brs](https://github.com/mraware/img2brs) by [mraware](https://github.com/mraware))

Try it at https://banhathome.com/img2brs/

## Installation

```shellscript
$ yarn add img2brs
```

## Example Usage

Node.js:
```js
import img2brs from 'img2brs';

fs.writeFileSync('/Brickadia/Saved/Builds/runelite-logo.brs', img2brs());
```

Browser:


## API Documentation

img2brs() : Blob

BRICKS : array

MATERIALS : array

// for browsers
download() : void
