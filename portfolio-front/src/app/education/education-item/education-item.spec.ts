import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { EducationItem } from './education-item';
import { LANGUAGE } from '../../shared/services/language-service';
import { COMPANY } from '../../core/constants/companies';

describe('EducationItem', () => {
  let component: EducationItem;
  let fixture: ComponentFixture<EducationItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationItem],
      providers: [
        provideTranslateService({ lang: LANGUAGE.ENGLISH, fallbackLang: LANGUAGE.ENGLISH }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EducationItem);
    fixture.componentRef.setInput('educationItem', {
      company: COMPANY.UNICEN,
      position: 'Bachelor’s Degree in Software Engineering',
      startDate: new Date(2026, 6, 1),
      endDate: null,
      description: 'Test education',
      stack: [],
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
