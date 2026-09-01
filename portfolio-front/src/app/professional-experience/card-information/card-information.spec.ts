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
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
