
export default function debounce(fn: Function, delay: number) {
  let timeoutId: null | ReturnType<typeof setTimeout> = null
  console.log(arguments);

  return (...args: any[]) => {
      if (timeoutId !== null) {
        console.log("clearing");
        clearTimeout(Number(timeoutId));
      }

      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
  }
}