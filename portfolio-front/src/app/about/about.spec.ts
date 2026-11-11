import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';

import { About } from './about';
import { LANGUAGE } from '../shared/services/language-service';
import { APP_PAGE_PATHS } from '../core/constants/app-page-routes';

describe('About', () => {
  let component: About;
  let fixture: ComponentFixture<About>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [About],
      providers: [
        provideRouter([]),
        provideTranslateService({ lang: LANGUAGE.ENGLISH, fallbackLang: LANGUAGE.ENGLISH }),
      ],
    }).compileComponents();

    TestBed.inject(TranslateService).setTranslation(LANGUAGE.ENGLISH, {
      ABOUT: { BIO: 'First paragraph.\n\nSecond paragraph.' },
    });

    fixture = TestBed.createComponent(About);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  function element(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a single h1 with the full name', () => {
    const headings = element().querySelectorAll('h1');

    expect(headings.length).toBe(1);
    expect(headings[0].textContent).toContain('María Carolina Díaz Castro');
  });

  it('should link the hero actions to the experience and contact pages', () => {
    const hrefs = Array.from(element().querySelectorAll('.hero-actions a'), (link) =>
      link.getAttribute('href'),
    );

    expect(hrefs).toEqual([
      `/${APP_PAGE_PATHS.PROFESSIONAL_EXPERIENCE}`,
      `/${APP_PAGE_PATHS.CONTACT}`,
    ]);
  });

  it('should render the quick facts as a description list', () => {
    expect(element().querySelectorAll('.facts .fact dt').length).toBe(3);
    expect(element().querySelector('.facts')?.textContent).toContain('Tandil');
  });

  it('should render each bio paragraph in its own <p>', () => {
    const paragraphs = Array.from(element().querySelectorAll('.bio-text p'), (p) =>
      p.textContent?.trim(),
    );

    expect(paragraphs).toEqual(['First paragraph.', 'Second paragraph.']);
  });
});
