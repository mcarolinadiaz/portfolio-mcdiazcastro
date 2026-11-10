import { LANGUAGE, SupportedLanguage } from '../../shared/services/language-service';

/**
 * Downloadable CV, one PDF per language under `public/cv/<language>/`. Every
 * version is saved as the same `fileName`, whatever the active language.
 */
export const CURRICULUM: {
  readonly paths: Readonly<Record<SupportedLanguage, string>>;
  readonly fileName: string;
} = {
  paths: {
    [LANGUAGE.ENGLISH]: 'cv/en/Resume-CarolinaDiaz.pdf',
    [LANGUAGE.SPANISH]: 'cv/es/Resume-CarolinaDiaz.pdf',
  },
  fileName: 'Resume-CarolinaDiaz.pdf',
};
