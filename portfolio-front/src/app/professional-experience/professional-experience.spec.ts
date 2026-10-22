import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';

import { ProfessionalExperience } from './professional-experience';
import { LANGUAGE } from '../shared/services/language-service';

describe('ProfessionalExperience', () => {
  let component: ProfessionalExperience;
  let fixture: ComponentFixture<ProfessionalExperience>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalExperience],
      providers: [
        provideTranslateService({ lang: LANGUAGE.ENGLISH, fallbackLang: LANGUAGE.ENGLISH }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfessionalExperience);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
