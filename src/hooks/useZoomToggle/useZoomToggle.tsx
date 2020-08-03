import { useState, useEffect } from 'react';

export default function useZoomToggle() {
  const [isZoomed, setIsZoomed] = useState(true);

  const toggleIsZoomed = () => {
    setIsZoomed(!isZoomed);
  };

  useEffect(() => {});

  return [isZoomed, toggleIsZoomed] as const;
}
