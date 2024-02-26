/**
 * Creates a deep copy of an object or array.
 *
 * @param obj - The object or array to be deep copied.
 * @returns The deep copied object or array.
 */
export function deepCopy(obj: { [key: string]: any } | any[] | any) {
  if (typeof obj !== "object" || obj === null) {
    return obj; // Return the value if obj is not an object
  }

  let copy: { [key: string]: any } | any[] | any = Array.isArray(obj) ? [] : {}; // Determine if obj is an array or an object

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopy(obj[key]); // Recursively deep copy nested objects
    }
  }

  return copy;
}
