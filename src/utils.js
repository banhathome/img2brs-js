/**
 * Unreal Engine 4 uses January 1, 0001 as its epoch
 * It also stores time values as ticks of 0.1 microseconds (= 100 nanoseconds)
 * So, UE4 epoch is 621355968000000000 ticks before Unix epoch (1970-01-01)
 *
 * Source: https://dev.epicgames.com/documentation/en-us/unreal-engine/API/Runtime/Core/Misc/FDateTime
 */
const UE4_EPOCH_OFFSET = 621355968000000000n;

/**
 * Gets cur time and formats it to be used in the .brs file
 *
 * @returns {Uint8Array} formatted timestamp of current time (in nanoseconds) to be set as `save_time` in the .brs file
 */
export function getSaveTime() {
  // Current time as Unix timestamp in nanoseconds
  const now = BigInt(new Date().getTime()) * 1000000n;


  // Convert to ticks of 0.1 microseconds (= 100 nanoseconds)
  const totalTicks = now / 100n;

  // Convert to UE4 Epoch
  const ue4Ticks = UE4_EPOCH_OFFSET + totalTicks;

  const buffer = new ArrayBuffer(8);
  const view = new DataView(new ArrayBuffer(8));

  // Write as signed 64-bit integer in Little Endian format
  view.setBigInt64(0, ue4Ticks, true);

  return new Uint8Array(buffer);
}

/**
 * Converts an sRGB value to linear RGB
 *
 * - Most image formats store its color values as sRGB
 * - Unreal Engine 4 uses linear RGB values for rendering
 *
 * So we need to do a conversion to make our images display correctly in UE4
 *
 * @param {Number} srgb - srgb value between 0 and 255
 * @returns linear rgb value between 0 and 255
 */
export function srgbToLinear(srgb) {
    const normalized = srgb / 255.0;
    if (normalized > 0.04045) {
        return Math.pow((normalized / 1.055) + 0.0521327014, 2.4) * 255.0;
    } else {
        return (normalized / 12.92) * 255.0;
    }
}
