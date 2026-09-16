import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInformation } from './card-information';

describe('CardInformation', () => {
  let component: CardInformation;
  let fixture: ComponentFixture<CardInformation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardInformation],
    }).compileComponents();

    fixture = TestBed.createComponent(CardInformation);
    fixture.componentRef.setInput('professionalExperience', {
      company: 'Test Company',
      position: 'Test Position',
      startDate: new Date('2026-01-01'),
      endDate: null,
      description: '',
      stack: []
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an open-ended experience as Present', () => {
    expect(component.getEndDate(null)).toBe('Present');
    expect(component.getDateToString(new Date('2026-08-01'), null)).toBe('Aug 2026 - Present');
  });

  it('should omit the year for dates in the same year', () => {
    expect(component.getDateToString(new Date('2026-01-01'), new Date('2026-09-15')))
      .toBe('Jan - Sep 2026');
  });
});
