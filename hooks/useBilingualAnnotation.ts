
import { useCallback } from 'react';
import { useAppContext, addBilingualAnnotations } from '../contexts/AppContext';

export const useBilingualAnnotation = () => {
  const { glossaryMaps } = useAppContext();

  const annotate = useCallback((text: string | undefined | null): string => {
    if (!text) return '';
    return addBilingualAnnotations(text, glossaryMaps);
  }, [glossaryMaps]);

  return annotate;
};
