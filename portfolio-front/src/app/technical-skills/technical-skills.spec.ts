import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalSkills } from './technical-skills';

describe('TechnicalSkills', () => {
  let component: TechnicalSkills;
  let fixture: ComponentFixture<TechnicalSkills>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicalSkills],
    }).compileComponents();

    fixture = TestBed.createComponent(TechnicalSkills);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
