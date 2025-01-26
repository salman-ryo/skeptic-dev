/**
 * Returns a new array containing only the first `count` items from the input array.
 * If `count` is greater than the array's length, returns the entire array.
 * Handles edge cases such as negative counts or invalid inputs.
 *
 * @param array - The input array
 * @param count - The number of items to include in the output array
 * @returns A new array with at most `count` items
 */
export function limitArray<T>(array: T[], count: number): T[] {
    // Handle edge cases
    if (!Array.isArray(array)) {
        throw new Error("Input must be an array.");
    }
    if (typeof count !== "number" || count < 0) {
        throw new Error("Count must be a non-negative number.");
    }

    // Return sliced array
    return array.slice(0, count);
}