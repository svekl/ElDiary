import { useEffect, useRef } from "react";

const useEffectAfterMount = (func, dependencies) => {
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
  }, []);

  useEffect(() => {
    if (!mounted.current) {
      return func();
    } else {
      mounted.current = false;
    }
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useEffectAfterMount;
