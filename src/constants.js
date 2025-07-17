/**
 * List of brick types that are current compatible with this library
 */
export const BRICKS = Object.freeze([
  'PB_DefaultBrick',
  'PB_DefaultTile',
  'PB_DefaultSideWedge',
  'PB_DefaultSideWedgeTile',
  'PB_DefaultWedge',
  'PB_DefaultMicroBrick',
  'PB_DefaultMicroWedge',
]);

/**
 * List of materials that are currently compatible with this library
 */
export const MATERIALS = Object.freeze([
  'BMC_Plastic',
  'BMC_Glow',
  'BMC_Metallic',
  'BMC_Hologram',
]);

/**
 * Simple Directions (internal implementation) to .brs directions
 */
export const SIMPLE_DIRECTION_MAP = Object.freeze({
  // 0: X Positive
  // 1: X Negative
  vertical: 2, // Y Positive
  // 3: Y Negative
  horizontal: 4, // Z Positive
  // 5: Z Negative
});

export const DEFAULT_DESCRIPTION = 'Generated with img2brs.js';
export const DEFAULT_FILE_NAME = 'default.brs':

export const isNode = typeof process === 'object' && process.env && process.versions?.node;
