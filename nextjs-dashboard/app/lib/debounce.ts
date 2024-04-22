
export default function debounce(fn: Function, delay: number) {
  let timeoutId: null | ReturnType<typeof setTimeout> = null

  return (...args: any[]) => {
      if (timeoutId !== null) {
        clearTimeout(Number(timeoutId));
      }

      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
  }
}