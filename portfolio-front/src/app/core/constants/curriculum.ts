import { LANGUAGE, SupportedLanguage } from '../../shared/services/language-service';

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
