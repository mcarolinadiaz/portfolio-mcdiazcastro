import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';

import { DropdownMenu } from './dropdown-menu';
import { ResponsiveService } from '../../shared/services/responsive-service';
import { LANGUAGE } from '../../shared/services/language-service';
import { NAVIGATION_ROUTES } from '../../core/constants/app-page-routes';

describe('DropdownMenu', () => {
  let component: DropdownMenu;
  let fixture: ComponentFixture<DropdownMenu>;

  async function setup(isMobile: boolean): Promise<void> {
    await TestBed.configureTestingModule({
      imports: [DropdownMenu],
      providers: [
        provideRouter([]),
        provideTranslateService({ lang: LANGUAGE.ENGLISH, fallbackLang: LANGUAGE.ENGLISH }),
        {
          provide: ResponsiveService,
          useValue: { isMobile: () => isMobile },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  }

  function query(selector: string): HTMLElement | null {
    return fixture.nativeElement.querySelector(selector);
  }

  describe('on mobile', () => {
    beforeEach(() => setup(true));

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should keep the menu closed until the toggle is pressed', async () => {
      const toggle = query('.menu-toggle') as HTMLButtonElement;
      expect(toggle.getAttribute('aria-expanded')).toBe('false');
      expect(query('.mobile-menu')).toBeNull();

      toggle.click();
      await fixture.whenStable();

      expect(toggle.getAttribute('aria-expanded')).toBe('true');
      expect(fixture.nativeElement.querySelectorAll('.mobile-menu .menu-link').length).toBe(
        NAVIGATION_ROUTES.length,
      );
    });

    it('should close the menu on Escape', async () => {
      component.toggleMenu();
      await fixture.whenStable();

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await fixture.whenStable();

      expect(component.isMenuOpen()).toBe(false);
      expect(query('.mobile-menu')).toBeNull();
    });
  });

  describe('on desktop', () => {
    beforeEach(() => setup(false));

    it('should render every navigation link without a toggle', () => {
      expect(query('.menu-toggle')).toBeNull();
      expect(fixture.nativeElement.querySelectorAll('.desktop-menu .menu-link').length).toBe(
        NAVIGATION_ROUTES.length,
      );
    });
  });
});
