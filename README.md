# img2brs.js

[![npm package][npm-badge]][npm] [![npm package][npm-downloads-badge]][npm]

[npm-badge]: https://img.shields.io/npm/v/img2brs.svg
[npm-downloads-badge]: https://img.shields.io/npm/d18m/img2brs.svg

[npm]: https://www.npmjs.org/package/img2brs

JS library to convert images into Brickadia save files (.brs). Compatible with both Web Worker and browser environments (Node.js support coming soon!)

(JS version of [img2brs](https://github.com/mraware/img2brs) by [mraware](https://github.com/mraware))

Try it at https://banhathome.com/img2brs/

![dawson_ingame](https://github.com/user-attachments/assets/8448e669-072c-40dd-8187-8c534caf458d)


## Installation

```shellscript
$ yarn add img2brs
```

## Usage Examples

### Browser Usage Example
> Large images will cause the user's browser tab to freeze, so we highly recommend using a [Web Worker](#recommended-web-worker-usage-example) instead.

```javascript
import img2brs, { BRICKS, MATERIALS } from 'img2brs';

async function processImage() {
  const fileInput = document.getElementById('imageInput');
  const file = fileInput.files[0];

  const image = await createImageBitmap(file);

  const options = {
    brick: 'PB_DefaultBrick',
    material: 'BMC_Plastic',
    size: [2, 2, 6],
    simpleDirection: 'vertical',
    description: 'My Custom Pixel Art',
  };

  // Convert and get blob
  const brsBlob = img2brs(image, options);

  // Auto-download for user
  const url = URL.createObjectURL(result);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'somefile.brs';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
```

### (Recommended) Web Worker Usage Example
> This examples is compatible with Next.js 12+/Webpack 5+

```javascript
// my-web-worker.js
import img2brs from 'img2brs';

self.onmessage = async function(e) {
  const { image, options } = e.data;

  try {
    const result = img2brs(image, options);

    self.postMessage({
      type: 'success',
      result,
    });
  } catch (error) {
    self.postMessage({
      type: 'error',
      error: error.message || error.toString(),
    });
  }
};

// MyComponent.jsx
import React, { useRef } from 'react';

export default function MyComponent() {
  const workerRef = useRef(null);

  workerRef.current = new Worker(
      new URL('./my-web-worker.js', import.meta.url)
  );

  // ...

  async function onClick() {
    const image = await createImageBitmap(file); // file = user uploaded file via HTML input
    workerRef.current.postMessage({
      image,
      options,
    });
  }

}
```


## API Documentation

### Function Signature

```javascript
img2brs(image, options)
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `image` | `ImageBitmap` | Yes | Input image to convert |
| `options` | `Object` | Yes | Configuration options for the conversion process |

### Options Object

| Property | Type | Required | Description | Example |
|----------|------|----------|-------------|----------------|
| `brick` | `String` | Yes | The type of brick to use from the BRICKS enum/constants<br>**See:** [Supported Bricks](#supported-bricks) | `'PB_DefaultBrick'` |
| `material` | `String` | Yes | The material type to apply to bricks from the MATERIALS enum/constants<br>**See:** [Supported Materials](#supported-materials) | `'BMC_Plastic'` |
| `size` | `[Number, Number, Number]` | Yes | The dimensions of each brick as `[width, depth, height]` | `[2, 2, 6]` |
| `simpleDirection` | `String` | No | Orientation of the brick placement<br>**Values:** `'vertical'` or `'horizontal'` | `'vertical'` |
| `description` | `String` | No | Description for the save file | `'It is Dawson!'` |

### Return Value

| Type | Description |
|------|-------------|
| `Blob` | A Blob object containing the .brs file data |

## Supported Bricks

`BRICKS` contains all supported brick types:

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

`MATERIALS` contains all supported material types:

```javascript
import { MATERIALS } from 'img2brs';
// MATERIALS is an array of supported material types
```

- `BMC_Plastic`
- `BMC_Glow`
- `BMC_Metallic`
- `BMC_Hologram`
