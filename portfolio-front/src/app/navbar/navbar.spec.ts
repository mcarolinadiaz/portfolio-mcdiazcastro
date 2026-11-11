import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreakpointObserver } from '@angular/cdk/layout';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

import { Navbar } from './navbar';
import { LANGUAGE } from '../shared/services/language-service';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [
        provideRouter([]),
        provideTranslateService({ lang: LANGUAGE.ENGLISH, fallbackLang: LANGUAGE.ENGLISH }),
        {
          provide: BreakpointObserver,
          useValue: { observe: () => of({ matches: false, breakpoints: {} }) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the brand as a link to the home page', () => {
    const brand = fixture.nativeElement.querySelector('.brand') as HTMLAnchorElement;

    expect(brand.getAttribute('href')).toBe('/');
    expect(brand.querySelector('.navbar-title')?.textContent).toContain('Carolina Díaz');
  });
});
