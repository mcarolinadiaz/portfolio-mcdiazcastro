import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';

import { Contact } from './contact';
import { LANGUAGE } from '../shared/services/language-service';
import { UserInformationService } from '../shared/services/user-information-service';

describe('Contact', () => {
  let fixture: ComponentFixture<Contact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact],
      providers: [
        provideTranslateService({ lang: LANGUAGE.ENGLISH, fallbackLang: LANGUAGE.ENGLISH }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Contact);
    await fixture.whenStable();
  });

  function element(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  it('should render one h1 and no location or work authorization details', () => {
    const { location, workAuthorization } = TestBed.inject(UserInformationService).user();

    expect(element().querySelectorAll('h1').length).toBe(1);
    expect(element().querySelector('.eyebrow')).toBeNull();
    expect(element().textContent).not.toContain(location);
    expect(element().textContent).not.toContain(workAuthorization);
  });

  it('should render one card per network, highlighting the email', () => {
    const cards = Array.from(element().querySelectorAll<HTMLAnchorElement>('.social-card'));
    const networks = TestBed.inject(UserInformationService).getProfessionalNetworks();

    expect(cards.length).toBe(networks.length);
    expect(cards.at(-1)?.classList).toContain('is-featured');
    expect(cards.at(-1)?.textContent).toContain('diazmariacarolina6@gmail.com');
  });
});
