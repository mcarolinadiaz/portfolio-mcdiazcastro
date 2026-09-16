import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreakpointObserver } from '@angular/cdk/layout';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { Navbar } from './navbar';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [
        provideRouter([]),
        {
          provide: BreakpointObserver,
          useValue: { observe: () => of({ matches: false, breakpoints: {} }) }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read the deepest active route title instead of the app root route', () => {
    const deepestRoute = {
      snapshot: { title: 'About me | MCDíazCastro', data: {} },
      routeConfig: { title: 'About me | MCDíazCastro' },
      children: [],
      firstChild: null
    };
    const childRoute = {
      snapshot: { title: undefined, data: {} },
      routeConfig: undefined,
      children: [deepestRoute],
      firstChild: deepestRoute
    };
    const routeTree = {
      snapshot: { title: undefined, data: {} },
      routeConfig: undefined,
      children: [childRoute],
      firstChild: childRoute
    };

    (component as any).activatedRoute = routeTree;
    (component as any).updateSectionTitle();

    expect(component.sectionTitle()).toBe(' MCDíazCastro');
  });
});
