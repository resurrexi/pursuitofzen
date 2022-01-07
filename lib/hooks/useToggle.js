import { useState, useCallback } from "react";

export function useToggle(initialValue = false) {
  const [isToggled, setIsToggled] = useState(initialValue);
  const toggle = useCallback(() => {
    setIsToggled((prev) => !prev);
  }, [setIsToggled]);

  return [isToggled, toggle, setIsToggled];
}
