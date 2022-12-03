import { useState, useEffect } from "react";

function useWindowResize(state) {
  const [size, setSize] = useState(state);
  useEffect(() => {
    function resizeHandler() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener("resize", resizeHandler);
    resizeHandler();
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);
  return size;
}

export default useWindowResize;
