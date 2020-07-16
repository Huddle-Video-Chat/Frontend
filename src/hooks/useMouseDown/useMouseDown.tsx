import { useState, useEffect } from 'react';

const useMouseDown = () => {
  const [mouseDown, setMouseDown] = useState(false);

  const updateMousePosition = (ev: any) => {
    setMouseDown(true);
  };

  useEffect(() => {
    window.addEventListener('mousedown', updateMousePosition);

    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return mouseDown;
};

export default useMouseDown;