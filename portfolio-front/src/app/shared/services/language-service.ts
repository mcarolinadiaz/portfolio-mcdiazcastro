import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID, Service, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type SupportedLanguage = 'en' | 'es';

export const LANGUAGE = {
  ENGLISH: 'en',
  SPANISH: 'es',
} as const satisfies Record<string, SupportedLanguage>;

const LANGUAGE_STORAGE_KEY = 'portfolio-language';

@Service()
export class LanguageService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly translate = inject(TranslateService);

  readonly activeLanguage = signal<SupportedLanguage>(LANGUAGE.ENGLISH);

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    const language: SupportedLanguage =
      storedLanguage === LANGUAGE.SPANISH ? LANGUAGE.SPANISH : LANGUAGE.ENGLISH;
    this.setLanguage(language);
  }

  setLanguage(language: SupportedLanguage): void {
    this.activeLanguage.set(language);

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    this.translate.use(language).subscribe({
      error: (error: unknown) => console.error(`Unable to load ${language} translations.`, error),
    });
  }
}
