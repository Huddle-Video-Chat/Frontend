import { useCallback, useState, useEffect } from 'react';
import fscreen from 'fscreen';

export default function useFullScreenToggle() {
  const [isZoomed, setIsZoomed] = useState(true);

  

  const toggleIsZoomed = () => {
    setIsZoomed(!isZoomed)
  }

  return [isZoomed, toggleIsZoomed] as const;
}
