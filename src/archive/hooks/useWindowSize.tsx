import { useLayoutEffect, useState } from "react";

const useWindowSize = () => {
  const [windowWidth, setWidth] = useState(innerWidth);
  const [windowHeight, setHeight] = useState(innerHeight);

  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useLayoutEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [innerWidth, innerHeight]);
  return [windowWidth, windowHeight];
};

export default useWindowSize;
