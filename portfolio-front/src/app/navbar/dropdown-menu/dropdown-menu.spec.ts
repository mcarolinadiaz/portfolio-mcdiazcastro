import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';

import { DropdownMenu } from './dropdown-menu';
import { ResponsiveService } from '../../shared/services/responsive-service';
import { LANGUAGE } from '../../shared/services/language-service';

describe('DropdownMenu', () => {
  let component: DropdownMenu;
  let fixture: ComponentFixture<DropdownMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownMenu],
      providers: [
        provideRouter([]),
        provideTranslateService({ lang: LANGUAGE.ENGLISH, fallbackLang: LANGUAGE.ENGLISH }),
        {
          provide: ResponsiveService,
          useValue: { isMobile: () => true },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
