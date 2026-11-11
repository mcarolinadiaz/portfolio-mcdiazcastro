import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';

import { SocialLinks } from './social-links';
import { LANGUAGE } from '../services/language-service';
import { UserInformationService } from '../services/user-information-service';

describe('SocialLinks', () => {
  let fixture: ComponentFixture<SocialLinks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialLinks],
      providers: [
        provideTranslateService({ lang: LANGUAGE.ENGLISH, fallbackLang: LANGUAGE.ENGLISH }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SocialLinks);
    await fixture.whenStable();
  });

  function links(): HTMLAnchorElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('.social-link'));
  }

  it('should render one labelled link per professional network', () => {
    const networks = TestBed.inject(UserInformationService).getProfessionalNetworks();

    expect(links().map((link) => link.getAttribute('aria-label'))).toEqual(
      networks.map((network) => network.name),
    );
  });

  it('should show the address without protocol in the cards variant', async () => {
    fixture.componentRef.setInput('variant', 'cards');
    await fixture.whenStable();

    const urls = Array.from(
      fixture.nativeElement.querySelectorAll('.social-card-url') as NodeListOf<HTMLElement>,
      (url) => url.textContent?.trim(),
    );
    expect(urls).toEqual([
      'linkedin.com/in/mariacarolinadiaz',
      'github.com/mcarolinadiaz',
      'diazmariacarolina6@gmail.com',
    ]);
  });

  it('should open web profiles in a new tab but not mailto links', () => {
    const [linkedin, , email] = links();

    expect(linkedin.getAttribute('target')).toBe('_blank');
    expect(linkedin.getAttribute('rel')).toBe('noopener');
    expect(email.getAttribute('href')).toContain('mailto:');
    expect(email.hasAttribute('target')).toBe(false);
  });
});
