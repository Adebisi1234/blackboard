import { useLayoutEffect, useState } from "react";

const useWindowSize = () => {
  const [size, setSize] = useState<[number, number]>([
    window.innerWidth,
    window.innerHeight,
  ]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

export default useWindowSize;
