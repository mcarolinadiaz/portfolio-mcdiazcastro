import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterContent } from './center-content';

describe('CenterContent', () => {
  let component: CenterContent;
  let fixture: ComponentFixture<CenterContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CenterContent],
    }).compileComponents();

    fixture = TestBed.createComponent(CenterContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
