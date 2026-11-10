import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';

import { Education } from './education';
import { LANGUAGE, LanguageService } from '../shared/services/language-service';
import { UserInformationService } from '../shared/services/user-information-service';

describe('Education', () => {
  let component: Education;
  let fixture: ComponentFixture<Education>;

  beforeEach(async () => {
    // LanguageService restores the language saved by a previous test.
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [Education],
      providers: [
        provideTranslateService({ lang: LANGUAGE.ENGLISH, fallbackLang: LANGUAGE.ENGLISH }),
      ],
    }).compileComponents();

    TestBed.inject(TranslateService).setTranslation(LANGUAGE.ENGLISH, {
      CERTIFICATIONS_INFO: {
        SOLVD: { DESCRIPTION: 'Line one.\nLine two.' },
        CACIC: { DESCRIPTION: '' },
      },
    });

    fixture = TestBed.createComponent(Education);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  function element(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  it('should render one h1 and the degree period', () => {
    expect(element().querySelectorAll('h1').length).toBe(1);
    expect(component.degreePeriod()).toBe('Mar 2015 – Jul 2026');
  });

  it('should render one article per certification with its period', () => {
    const certifications = TestBed.inject(UserInformationService).getCertifications();

    expect(element().querySelectorAll('article.certification').length).toBe(
      certifications.length,
    );
    expect(component.certifications().map((item) => item.period)).toEqual([
      'Dec 2022 – Feb 2023',
      'Oct 2021',
      'Oct 2018',
      'Oct 2017',
    ]);
  });

  it('should only render certification descriptions that have text', () => {
    const descriptions = element().querySelectorAll('.certification-description');

    expect(descriptions.length).toBe(1);
    expect(descriptions[0].textContent).toContain('Line one.');
  });

  it('should render the technical skills grouped by category', () => {
    const groups = TestBed.inject(UserInformationService).getTechnicalSkillGroups();

    expect(element().querySelectorAll('.skill-group').length).toBe(groups.length);
    expect(element().querySelectorAll('.skill-group .tag').length).toBe(
      groups.reduce((total, group) => total + group.skills.length, 0),
    );
  });

  it('should format periods in the active language', async () => {
    TestBed.inject(LanguageService).setLanguage(LANGUAGE.SPANISH);
    await fixture.whenStable();

    expect(component.certifications()[0].period).toBe('Dic 2022 – Feb 2023');
  });
});
