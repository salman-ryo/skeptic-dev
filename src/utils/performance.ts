/**
 * Creates a debounced function that delays invoking the provided function until after the specified delay has elapsed
 * since the last time the debounced function was invoked.
 *
 * @template T - A function type.
 * @param {T} func - The function to debounce.
 * @param {number} delay - The number of milliseconds to delay.
 * @returns {(...args: Parameters<T>) => void} A debounced version of the provided function.
 *
 * @example
 * const debouncedFunction = debounce(() => console.log('Executed!'), 300);
 * window.addEventListener('resize', debouncedFunction);
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

/**
 * Creates a throttled function that only invokes the provided function at most once every specified number of milliseconds.
 *
 * @template T - A function type.
 * @param {T} func - The function to throttle.
 * @param {number} limit - The number of milliseconds to wait before allowing the function to be called again.
 * @returns {(...args: Parameters<T>) => void} A throttled version of the provided function.
 *
 * @example
 * const throttledFunction = throttle(() => console.log('Executed!'), 1000);
 * window.addEventListener('scroll', throttledFunction);
 */
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastFunc: NodeJS.Timeout;
  let lastRan: number;

  return (...args: Parameters<T>) => {
    if (!lastRan) {
      func(...args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

/**
 * Delays the execution of code for a specified number of milliseconds.
 *
 * @param {number} ms - The number of milliseconds to delay.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 *
 * @example
 * async function example() {
 *   console.log('Before delay');
 *   await delay(1000);
 *   console.log('After delay');
 * }
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
