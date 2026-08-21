import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navbar } from './navbar';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read the deepest active route title instead of the app root route', () => {
    const routeTree = {
      snapshot: { title: undefined, data: {} },
      routeConfig: undefined,
      children: [
        {
          snapshot: { title: undefined, data: {} },
          routeConfig: undefined,
          children: [
            {
              snapshot: { title: 'About me | MCDíazCastro', data: {} },
              routeConfig: { title: 'About me | MCDíazCastro' },
              children: [],
            },
          ],
        },
      ],
    };

    (component as any).router = {
      routerState: { root: routeTree },
    };

    expect((component as any).getRouteTitle()).toBe('About me | MCDíazCastro');
  });
});
