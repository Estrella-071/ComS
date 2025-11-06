import { zh } from '../locales/zh';

type TranslationKey = keyof typeof zh;

export const useTranslation = () => {
  const t = (key: TranslationKey) => {
    return zh[key] || key;
  };

  return { t };
};
