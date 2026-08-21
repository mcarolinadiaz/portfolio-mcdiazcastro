import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalExperience } from './professional-experience';

describe('ProfessionalExperience', () => {
  let component: ProfessionalExperience;
  let fixture: ComponentFixture<ProfessionalExperience>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalExperience],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfessionalExperience);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
