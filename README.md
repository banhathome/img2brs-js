# img2brs.js

[![npm package][npm-badge]][npm]

[npm-badge]: https://img.shields.io/npm/v/img2brs.svg
[npm]: https://www.npmjs.org/package/img2brs

JS library to convert images into Brickadia save files (.brs). Compatible with both Node.js (WIP) and browser environments.

(JS version of [img2brs](https://github.com/mraware/img2brs) by [mraware](https://github.com/mraware))

Try it at https://banhathome.com/img2brs/

![dawson_ingame](https://github.com/user-attachments/assets/8448e669-072c-40dd-8187-8c534caf458d)


## Installation

```shellscript
$ yarn add img2brs
```

## Usage Examples

### Basic Usage (Browser)

```javascript
import img2brs, { BRICKS, MATERIALS } from 'img2brs';

const fileInput = document.getElementById('imageInput');
const file = fileInput.files[0];

const options = {
  brick: 'PB_DefaultBrick',
  material: 'BMC_Plastic',
  size: [2, 2, 6],
  simpleDirection: 'vertical',
  description: 'My Custom Pixel Art',
  saveName: 'my_pixel_art.brs',
};

// Convert and get blob
const brsBlob = img2brs(file, options);

// Convert and auto-download for web user
img2brs(file, options, true);
```

### Node.js Usage

```javascript
import img2brs, { BRICKS, MATERIALS } from 'img2brs';
import fs from 'fs';

// Using file path
const options = {
  brick: 'PB_DefaultBrick',
  material: 'BMC_Plastic',
  size: [2, 2, 6],
};

const brsBlob = img2brs('./path/to/image.png', options);

// Save to file
const buffer = Buffer.from(await brsBlob.arrayBuffer());
fs.writeFileSync('output.brs', buffer);
```


## API Documentation

### Function Signature

```javascript
img2brs(file, options, shouldDownload = false)
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file` | `File \| Buffer \| String` | Yes | Input image file to convert<br>• **Browser:** `File` object (from file input or drag-and-drop)<br>• **Node.js:** `Buffer` object or file path string |
| `options` | `Object` | Yes | Configuration options for the conversion process |
| `shouldDownload` | `Boolean` | No | **Browser-only.** Whether to automatically download the generated .brs file<br>**Default:** `false` |

### Options Object

| Property | Type | Required | Description | Example |
|----------|------|----------|-------------|----------------|
| `brick` | `String` | Yes | The type of brick to use from the BRICKS enum/constants<br>**See:** [Supported Bricks](#supported-bricks) | `'PB_DefaultBrick'` |
| `material` | `String` | Yes | The material type to apply to bricks from the MATERIALS enum/constants<br>**See:** [Supported Materials](#supported-materials) | `'BMC_Plastic'` |
| `size` | `[Number, Number, Number]` | Yes | The dimensions of each brick as `[width, depth, height]` | `[2, 2, 6]` |
| `simpleDirection` | `String` | No | Orientation of the brick placement<br>**Values:** `"vertical"` or `"horizontal"` | `'vertical'` |
| `description` | `String` | No | Description for the save file | `'It is Dawson!'` |
| `saveName` | `String` | No | Name for the downloaded file (browser only) | `'doggy.brs'` |

### Return Value

| Type | Description |
|------|-------------|
| `Blob` | A Blob object containing the .brs file data that can be saved or downloaded |

## Supported Bricks

The `BRICKS` constant is a named export containing all supported brick types:

```javascript
import { BRICKS } from 'img2brs';
// BRICKS is an array of supported brick types
```

- `PB_DefaultBrick`
- `PB_DefaultTile`
- `PB_DefaultSideWedge`
- `PB_DefaultSideWedgeTile`
- `PB_DefaultWedge`
- `PB_DefaultMicroBrick`
- `PB_DefaultMicroWedge`


## Supported Materials

The `MATERIALS` constant is a named export containing all supported material types:

```javascript
import { MATERIALS } from 'img2brs';
// MATERIALS is an array of supported material types
```

- `BMC_Plastic`
- `BMC_Glow`
- `BMC_Metallic`
- `BMC_Hologram`
