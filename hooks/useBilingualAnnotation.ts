
import { useCallback } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { addBilingualAnnotations } from '../utils/textUtils';

export const useBilingualAnnotation = () => {
  const { glossaryMaps } = useAppContext();

  const annotate = useCallback((text: string | undefined | null): string => {
    if (!text) return '';
    return addBilingualAnnotations(text, glossaryMaps);
  }, [glossaryMaps]);

  return annotate;
};
