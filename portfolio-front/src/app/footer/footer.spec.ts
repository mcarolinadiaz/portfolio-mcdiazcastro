import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreakpointObserver } from '@angular/cdk/layout';
import { provideTranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

import { Footer } from './footer';
import { LANGUAGE } from '../shared/services/language-service';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
      providers: [
        provideTranslateService({ lang: LANGUAGE.ENGLISH, fallbackLang: LANGUAGE.ENGLISH }),
        {
          provide: BreakpointObserver,
          useValue: { observe: () => of({ matches: false, breakpoints: {} }) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the social links and the version 1 preview button', () => {
    const footer = fixture.nativeElement as HTMLElement;

    expect(footer.querySelectorAll('.social-link').length).toBeGreaterThan(0);
    expect(footer.querySelector('.legacy-toggle')).not.toBeNull();
  });

  it('should credit the tools used to build the site, without Bootstrap', () => {
    const credits = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('.footer-text a'),
      (link) => link.textContent?.trim(),
    );

    expect(credits).toEqual([
      'Visual Studio Code',
      'Angular v22',
      'Vitest',
      'Claude',
      'Github Copilot',
      'Vercel',
    ]);
  });
});
