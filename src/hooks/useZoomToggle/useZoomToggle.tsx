import { useCallback, useState, useEffect } from 'react';
import fscreen from 'fscreen';

export default function useFullScreenToggle() {
  const [isZoomed, setIsZoomed] = useState(true);

  

  const toggleIsZoomed = () => {
    setIsZoomed(!isZoomed)
    console.log('click! zoom is ' + isZoomed)
  }

  return [isZoomed, toggleIsZoomed] as const;
}
