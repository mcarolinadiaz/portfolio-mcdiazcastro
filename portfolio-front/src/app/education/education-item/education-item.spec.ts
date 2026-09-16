import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EducationItem } from './education-item';

describe('EducationItem', () => {
  let component: EducationItem;
  let fixture: ComponentFixture<EducationItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationItem],
    }).compileComponents();

    fixture = TestBed.createComponent(EducationItem);
    fixture.componentRef.setInput('educationItem', {
      company: 'UNICEN',
      position: 'Bachelor’s Degree in Software Engineering',
      startDate: new Date(2026, 6, 1),
      endDate: null,
      description: 'Test education',
      stack: []
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
