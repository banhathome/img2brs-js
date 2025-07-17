import brs from 'brs-js';
import { createCanvas } from 'canvas';
import { SIMPLE_DIRECTION_MAP, DEFAULT_DESCRIPTION, DEFAULT_FILE_NAME, isNode } from './constants';
import { getSaveTime } from './utils';

/**
 * Converts inputted File into a .brs Blob
 * @param {File|Buffer|String} file - User uploaded File object or Buffer or file path for the file
 * @param {String} options.brick - value in BRICKS
 * @param {String} options.material - value in MATERIALS
 * @param {[Number, Number, Number]} options.size
 * @param {Boolean} [shouldDownload=false] - (Browser-Only) whether file should be downloaded after conversion
 * @returns {Blob} representing a .brs file
 */
export default function img2brs(file, options, shouldDownload = false) {
  const {
    brick,
    material,
    size,
    simpleDirection,
    description,
    saveName,
  } = options;

  let img = new Image();
  img.src = isNode ? file : file.preview;

  const canvas = isNode ? createCanvas() : document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  const bricks = [];
  for (let x = 0; x < canvas.width; x++) {
    for (let y = 0; y < canvas.height; y++) {
      const index = (y * canvas.width + x) * 4;
      const pixelRgba = {
        r: pixels[index],
        g: pixels[index + 1],
        b: pixels[index + 2],
        a: pixels[index + 3]
      };

      if (pixelRgba.a > 0) {
        bricks.push(pixelToBrick(x, y, pixelRgba, size, simpleDirection, canvas.height));
      }
    }
  }

  const writeData = {
    description: description || DEFAULT_DESCRIPTION,
    save_time: getSaveTime(),
    brick_assets: [brick],
    materials: [material],
    bricks,
  };

  const blob = new Blob([brs.write(writeData)]);

  if (shouldDownload) {
    const fileName = saveName || DEFAULT_FILE_NAME;
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = _saveName.endsWith('.brs') ? fileName : `${fileName}.brs`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return blob;
}

/**
 * Converts image pixel and a few options into a Brick object
 * @param {Number} x - pixel x-coordinate in image
 * @param {Number} y - pixel y-coordinate in image
 * @param {RGBA} pixelRgba
 * @param {[Number, Number, Number]} size
 * @param {string} simpleDirection - 'vertical' or 'horizontal'
 * @param {Number} imgHeight
 * @returns {Brick}
 */
function pixelToBrick(x, y, pixelRgba, size, simpleDirection, imgHeight) {
  const { r, g, b, a } = pixelRgba;
  const isVertical = simpleDirection === 'vertical';

  // Calculations taken from the original img2brs by mraware
  const newX = isVertical ? x * size[1] * 2 + size[1] : x * size[0] * 2 + size[0];
  const newY = isVertical ? y * size[0] * 2 + size[0] : y * size[1] * 2 + size[1];
  const position = isVertical ? [newX, size[2], -newY + (imgHeight * size[0] * 2)] : [newX, newY, size[2]];

  return {
    color: [srgbToLinear(r), srgbToLinear(g), srgbToLinear(b), a],
    size,
    direction: SIMPLE_DIRECTION_MAP[simpleDirection],
    position,

    asset_name_index: 0, // always zero because brick_assets array in save file will only consist of the selected brick
    material_index: 0,  // always zero because materials array in save file will only consist of the selected brick
    rotation: 0,
    collision: true,
    visibility: true,
  };
}
