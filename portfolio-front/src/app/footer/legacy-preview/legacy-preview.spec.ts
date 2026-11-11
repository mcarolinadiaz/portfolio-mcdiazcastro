import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';

import { LegacyPreview } from './legacy-preview';
import { LEGACY_SITE } from '../../core/constants/legacy-site';
import { LANGUAGE } from '../../shared/services/language-service';
import { ResponsiveService } from '../../shared/services/responsive-service';

describe('LegacyPreview', () => {
  let component: LegacyPreview;
  let fixture: ComponentFixture<LegacyPreview>;

  async function setup(isMobile: boolean): Promise<void> {
    await TestBed.configureTestingModule({
      imports: [LegacyPreview],
      providers: [
        provideTranslateService({ lang: LANGUAGE.ENGLISH, fallbackLang: LANGUAGE.ENGLISH }),
        { provide: ResponsiveService, useValue: { isMobile: () => isMobile } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LegacyPreview);
    component = fixture.componentInstance;
    document.body.appendChild(fixture.nativeElement);
    await fixture.whenStable();
  }

  function query<T extends HTMLElement>(selector: string): T | null {
    return fixture.nativeElement.querySelector(selector);
  }

  async function openPreview(): Promise<void> {
    query<HTMLButtonElement>('.legacy-toggle')!.click();
    await fixture.whenStable();
  }

  afterEach(() => fixture.nativeElement.remove());

  describe('on desktop', () => {
    beforeEach(() => setup(false));

    it('should start closed', () => {
      expect(query('.legacy-toggle')!.getAttribute('aria-expanded')).toBe('false');
      expect(query('.legacy-card')).toBeNull();
    });

    it('should open a card whose thumbnail links to version 1', async () => {
      await openPreview();

      const thumb = query<HTMLAnchorElement>('.legacy-thumb')!;
      expect(query('.legacy-toggle')!.getAttribute('aria-expanded')).toBe('true');
      expect(thumb.getAttribute('href')).toBe(LEGACY_SITE.url);
      expect(thumb.getAttribute('target')).toBe('_blank');
      expect(query('.legacy-thumb-img')!.getAttribute('src')).toBe(
        LEGACY_SITE.screenshots.desktop.src,
      );
      expect(query('.legacy-host')!.textContent).toContain(LEGACY_SITE.host);
    });

    it('should close with Escape and return focus to the toggle', async () => {
      await openPreview();

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await fixture.whenStable();

      expect(component.isOpen()).toBe(false);
      expect(document.activeElement).toBe(query('.legacy-toggle'));
    });

    it('should close when clicking outside', async () => {
      await openPreview();

      document.body.click();
      await fixture.whenStable();

      expect(query('.legacy-card')).toBeNull();
    });

    it('should stay open when clicking inside the card', async () => {
      await openPreview();

      query<HTMLElement>('.legacy-card-header')!.click();
      await fixture.whenStable();

      expect(component.isOpen()).toBe(true);
    });
  });

  describe('on mobile', () => {
    beforeEach(() => setup(true));

    it('should show the mobile screenshot with the overlay always visible', async () => {
      await openPreview();

      expect(query('.legacy-thumb-img')!.getAttribute('src')).toBe(
        LEGACY_SITE.screenshots.mobile.src,
      );
      expect(query('.legacy-thumb')!.classList).toContain('overlay-visible');
    });
  });
});
