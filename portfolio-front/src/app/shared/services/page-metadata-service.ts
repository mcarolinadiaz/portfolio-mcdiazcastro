import { DOCUMENT, inject, Service } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { SITE } from '../../core/constants/site';
import { LANGUAGE_LOCALE, LanguageService } from './language-service';

const DESCRIPTION_KEY = 'SEO.DESCRIPTION';
const SHARE_IMAGE_ALT_KEY = 'SEO.SHARE_IMAGE_ALT';
const CANONICAL_SELECTOR = 'link[rel="canonical"]';
const LEADING_SLASH = /^\//;

@Service()
export class PageMetadataService {
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly translate = inject(TranslateService);
  private readonly languageService = inject(LanguageService);

  update(title: string, path: string): void {
    const pageUrl = new URL(path.replace(LEADING_SLASH, ''), SITE.url).href;
    const imageUrl = new URL(SITE.shareImage.path, SITE.url).href;
    const locale = LANGUAGE_LOCALE[this.languageService.activeLanguage()].replace('-', '_');

    this.setCanonical(pageUrl);
    this.setProperties({
      'og:type': 'website',
      'og:site_name': SITE.name,
      'og:title': title,
      'og:url': pageUrl,
      'og:locale': locale,
      'og:image': imageUrl,
      'og:image:width': String(SITE.shareImage.width),
      'og:image:height': String(SITE.shareImage.height),
    });
    this.setNames({
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:image': imageUrl,
    });

    const description = this.translated(DESCRIPTION_KEY);
    if (description) {
      this.setNames({ description, 'twitter:description': description });
      this.setProperties({ 'og:description': description });
    }

    const imageAlt = this.translated(SHARE_IMAGE_ALT_KEY);
    if (imageAlt) {
      this.setProperties({ 'og:image:alt': imageAlt });
      this.setNames({ 'twitter:image:alt': imageAlt });
    }
  }

  private translated(key: string): string | undefined {
    const value: string = this.translate.instant(key);
    return value && value !== key ? value : undefined;
  }

  private setProperties(tags: Record<string, string>): void {
    for (const [property, content] of Object.entries(tags)) {
      this.meta.updateTag({ property, content });
    }
  }

  private setNames(tags: Record<string, string>): void {
    for (const [name, content] of Object.entries(tags)) {
      this.meta.updateTag({ name, content });
    }
  }

  private setCanonical(url: string): void {
    let link = this.document.head.querySelector<HTMLLinkElement>(CANONICAL_SELECTOR);
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = url;
  }
}
