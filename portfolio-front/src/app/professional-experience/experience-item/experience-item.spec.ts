import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';

import { ExperienceItem, ExperienceTimelineEntry } from './experience-item';
import { LANGUAGE } from '../../shared/services/language-service';

const ENTRY: ExperienceTimelineEntry = {
  experience: {
    company: 'ACME',
    position: 'Developer',
    startDate: new Date('2024-01-01'),
    endDate: null,
    description: 'Built things.',
    stack: ['Angular', 'TypeScript'],
  },
  dateRange: 'Jan 2024 – Present',
  terms: [],
  isCurrent: true,
};

describe('ExperienceItem', () => {
  let fixture: ComponentFixture<ExperienceItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceItem],
      providers: [
        provideTranslateService({ lang: LANGUAGE.ENGLISH, fallbackLang: LANGUAGE.ENGLISH }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceItem);
    fixture.componentRef.setInput('entry', ENTRY);
    await fixture.whenStable();
  });

  function element(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  it('should render the role as an article with a heading, dates and technologies', () => {
    expect(element().querySelector('article h2')?.textContent).toContain('Developer');
    expect(element().querySelector('.experience-company')?.textContent).toContain('ACME');
    expect(element().querySelector('.experience-dates')?.textContent).toContain(
      'Jan 2024 – Present',
    );
    expect(element().querySelectorAll('.tag').length).toBe(2);
  });

  it('should highlight the marker of a current role', () => {
    expect(element().querySelector('.experience-marker')?.classList).toContain('is-current');
  });

  it('should list the terms when the role has several periods', async () => {
    fixture.componentRef.setInput('entry', {
      ...ENTRY,
      terms: ['Aug 2026 – Present', 'Apr – Sep 2019'],
    });
    await fixture.whenStable();

    expect(element().querySelectorAll('.tag-outline').length).toBe(2);
  });

  it('should not render an empty technology list', async () => {
    fixture.componentRef.setInput('entry', {
      ...ENTRY,
      experience: { ...ENTRY.experience, stack: [] },
    });
    await fixture.whenStable();

    expect(element().querySelectorAll('.tag').length).toBe(0);
  });
});
