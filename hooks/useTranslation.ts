import { useAppContext } from '../contexts/AppContext';
import { en } from '../locales/en';
import { zh } from '../locales/zh';

const translations = { en, zh };
type TranslationKey = keyof typeof en & keyof typeof zh;


export const useTranslation = () => {
  const { language } = useAppContext();

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  return { t };
};
