import { TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';

import { LANGUAGE, LanguageService } from './language-service';

describe('LanguageService', () => {
  function createService(): LanguageService {
    TestBed.configureTestingModule({
      providers: [
        provideTranslateService({ lang: LANGUAGE.ENGLISH, fallbackLang: LANGUAGE.ENGLISH }),
      ],
    });
    return TestBed.inject(LanguageService);
  }

  it('should start in English when no language was saved', () => {
    const service = createService();

    expect(service.activeLanguage()).toBe(LANGUAGE.ENGLISH);
    expect(document.documentElement.lang).toBe(LANGUAGE.ENGLISH);
  });

  it('should restore the saved language', () => {
    localStorage.setItem('portfolio-language', LANGUAGE.SPANISH);

    expect(createService().activeLanguage()).toBe(LANGUAGE.SPANISH);
  });

  it('should update <html lang> so screen readers use the right pronunciation', () => {
    const service = createService();

    service.setLanguage(LANGUAGE.SPANISH);

    expect(document.documentElement.lang).toBe(LANGUAGE.SPANISH);
    expect(localStorage.getItem('portfolio-language')).toBe(LANGUAGE.SPANISH);
  });
});
