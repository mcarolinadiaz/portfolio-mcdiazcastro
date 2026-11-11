import { TestBed } from '@angular/core/testing';
import { Meta } from '@angular/platform-browser';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

import { PageMetadataService } from './page-metadata-service';
import { LANGUAGE, LanguageService } from './language-service';
import { SITE } from '../../core/constants/site';

describe('PageMetadataService', () => {
  let service: PageMetadataService;
  let meta: Meta;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideTranslateService({ lang: LANGUAGE.ENGLISH, fallbackLang: LANGUAGE.ENGLISH }),
      ],
    });
    const translate = TestBed.inject(TranslateService);
    translate.setTranslation(LANGUAGE.ENGLISH, {
      SEO: { DESCRIPTION: 'English description', SHARE_IMAGE_ALT: 'English alt' },
    });
    translate.setTranslation(LANGUAGE.SPANISH, {
      SEO: { DESCRIPTION: 'Descripción en español', SHARE_IMAGE_ALT: 'Alt en español' },
    });
    service = TestBed.inject(PageMetadataService);
    meta = TestBed.inject(Meta);
  });

  afterEach(() => {
    document.head.querySelector('link[rel="canonical"]')?.remove();
  });

  const content = (selector: string) => meta.getTag(selector)?.content;

  it('should describe the page for search engines and social networks', () => {
    service.update('Carolina Díaz | Education', '/education');

    expect(content('name="description"')).toBe('English description');
    expect(content('property="og:title"')).toBe('Carolina Díaz | Education');
    expect(content('property="og:description"')).toBe('English description');
    expect(content('property="og:url"')).toBe(`${SITE.url}education`);
    expect(content('property="og:locale"')).toBe('en_US');
    expect(content('name="twitter:card"')).toBe('summary_large_image');
    expect(content('name="twitter:title"')).toBe('Carolina Díaz | Education');
  });

  it('should point the share card to the absolute image URL', () => {
    service.update('Carolina Díaz', '/');

    expect(content('property="og:image"')).toBe(`${SITE.url}${SITE.shareImage.path}`);
    expect(content('property="og:image:width"')).toBe(String(SITE.shareImage.width));
    expect(content('property="og:image:alt"')).toBe('English alt');
  });

  it('should set a canonical link for the page', () => {
    service.update('Carolina Díaz', '/');
    service.update('Carolina Díaz | Education', '/education');

    const canonicals = document.head.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]');
    expect(canonicals.length).toBe(1);
    expect(canonicals[0].href).toBe(`${SITE.url}education`);
  });

  it('should use the active language for the description and locale', async () => {
    TestBed.inject(LanguageService).setLanguage(LANGUAGE.SPANISH);
    await firstValueFrom(TestBed.inject(TranslateService).use(LANGUAGE.SPANISH));

    service.update('Carolina Díaz | Educación', '/education');

    expect(content('name="description"')).toBe('Descripción en español');
    expect(content('property="og:locale"')).toBe('es_AR');
  });
});
