import { useCallback, useRef } from "react";

export const useDebounce = (
  delay: number,
  callback: (...args: any) => void
) => {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const debouncedCallback = useCallback(
    (...args: any) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debouncedCallback;
};
