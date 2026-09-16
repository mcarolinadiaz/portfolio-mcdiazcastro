import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordionComponent } from './accordion-component';

describe('AccordionComponent', () => {
  let component: AccordionComponent;
  let fixture: ComponentFixture<AccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionComponent);
    fixture.componentRef.setInput('idItem', 'education');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
