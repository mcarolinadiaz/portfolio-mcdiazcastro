import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { provideRouter, Routes, TitleStrategy } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';

import { LANGUAGE } from './language-service';
import { TranslatedTitleStrategy } from './translated-title-strategy';

@Component({ template: '' })
class BlankComponent {}

const routes: Routes = [
  { path: '', component: BlankComponent, title: 'NAV.ABOUT' },
  { path: 'education', component: BlankComponent, title: 'NAV.EDUCATION' },
];

describe('TranslatedTitleStrategy', () => {
  let title: Title;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        provideTranslateService({ lang: LANGUAGE.ENGLISH, fallbackLang: LANGUAGE.ENGLISH }),
        { provide: TitleStrategy, useClass: TranslatedTitleStrategy },
      ],
    });

    title = TestBed.inject(Title);
    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation(LANGUAGE.ENGLISH, {
      NAV: { ABOUT: 'About me', EDUCATION: 'Education' },
    });
    translateService.setTranslation(LANGUAGE.SPANISH, {
      NAV: { ABOUT: 'Sobre mí', EDUCATION: 'Educación' },
    });
  });

  it('should set the document title to the translated section name on navigation', async () => {
    await RouterTestingHarness.create('/education');

    expect(title.getTitle()).toBe('Carolina Díaz | Education');
  });

  it('should update the document title when the active language changes', async () => {
    await RouterTestingHarness.create('/education');

    translateService.use(LANGUAGE.SPANISH);

    expect(title.getTitle()).toBe('Carolina Díaz | Educación');
  });

  it('should fall back to the brand name when the route has no title', async () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideRouter([{ path: '', component: BlankComponent }]),
        provideTranslateService({ lang: LANGUAGE.ENGLISH, fallbackLang: LANGUAGE.ENGLISH }),
        { provide: TitleStrategy, useClass: TranslatedTitleStrategy },
      ],
    });

    await RouterTestingHarness.create('/');

    expect(TestBed.inject(Title).getTitle()).toBe('Carolina Díaz');
  });
});
