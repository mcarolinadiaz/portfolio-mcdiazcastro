import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGroup } from './list-group';

describe('ListGroup', () => {
  let component: ListGroup;
  let fixture: ComponentFixture<ListGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListGroup],
    }).compileComponents();

    fixture = TestBed.createComponent(ListGroup);
    fixture.componentRef.setInput('listItems', ['Angular', 'TypeScript']);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
