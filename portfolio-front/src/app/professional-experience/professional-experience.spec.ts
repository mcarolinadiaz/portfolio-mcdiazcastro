import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';

import { ProfessionalExperience } from './professional-experience';
import { LANGUAGE, LanguageService } from '../shared/services/language-service';
import { UserInformationService } from '../shared/services/user-information-service';
import { COMPANY } from '../core/constants/companies';
import { CURRICULUM } from '../core/constants/curriculum';

describe('ProfessionalExperience', () => {
  let component: ProfessionalExperience;
  let fixture: ComponentFixture<ProfessionalExperience>;

  beforeEach(async () => {
    // LanguageService restores the language saved by a previous test.
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [ProfessionalExperience],
      providers: [
        provideTranslateService({ lang: LANGUAGE.ENGLISH, fallbackLang: LANGUAGE.ENGLISH }),
      ],
    }).compileComponents();

    const translate = TestBed.inject(TranslateService);
    translate.setTranslation(LANGUAGE.ENGLISH, { COMMON: { PRESENT: 'Present' } });
    translate.setTranslation(LANGUAGE.SPANISH, { COMMON: { PRESENT: 'Presente' } });

    fixture = TestBed.createComponent(ProfessionalExperience);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  function element(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  it('should render one timeline item per experience', () => {
    const experiences = TestBed.inject(UserInformationService).getProfessionalExperiences();

    expect(element().querySelectorAll('.timeline > li').length).toBe(experiences.length);
    expect(element().querySelectorAll('h1').length).toBe(1);
  });

  it('should mark open-ended experiences as current', () => {
    const [latest, , liesa] = component.entries();

    expect(latest.isCurrent).toBe(true);
    expect(latest.dateRange).toBe('Sep 2026 – Present');
    expect(liesa.isCurrent).toBe(false);
    expect(liesa.dateRange).toBe('Sep 2024 – May 2026');
  });

  it('should list every teaching term and span them in the main date range', () => {
    const teaching = component.entries().find((entry) =>
      entry.experience.company.includes(COMPANY.UNICEN),
    )!;

    expect(teaching.terms.length).toBe(4);
    expect(teaching.dateRange).toBe('Apr 2019 – Present');
  });

  it('should format dates in the active language', async () => {
    TestBed.inject(LanguageService).setLanguage(LANGUAGE.SPANISH);
    await fixture.whenStable();

    expect(component.entries()[2].dateRange).toBe('Sept 2024 – May 2026');
    expect(component.entries()[0].dateRange).toBe('Sept 2026 – Presente');
  });

  it('should download the CV of the active language with the same file name', async () => {
    const button = () => element().querySelector('.page-header .button') as HTMLAnchorElement;

    expect(button().getAttribute('href')).toBe(CURRICULUM.paths[LANGUAGE.ENGLISH]);
    expect(button().getAttribute('download')).toBe(CURRICULUM.fileName);

    TestBed.inject(LanguageService).setLanguage(LANGUAGE.SPANISH);
    await fixture.whenStable();

    expect(button().getAttribute('href')).toBe(CURRICULUM.paths[LANGUAGE.SPANISH]);
    expect(button().getAttribute('download')).toBe(CURRICULUM.fileName);
  });
});
