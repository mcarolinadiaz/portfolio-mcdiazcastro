import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';

import { LANGUAGE } from '../../shared/services/language-service';
import { LanguageSelector } from './language-selector';

describe('LanguageSelector', () => {
  let component: LanguageSelector;
  let fixture: ComponentFixture<LanguageSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageSelector],
      providers: [
        provideTranslateService({ lang: LANGUAGE.ENGLISH, fallbackLang: LANGUAGE.ENGLISH }),
      ],
    }).compileComponents();

    const translateService = TestBed.inject(TranslateService);
    translateService.setTranslation(LANGUAGE.ENGLISH, { NAV: { EN: 'EN', SP: 'SP' } });
    translateService.setTranslation(LANGUAGE.SPANISH, { NAV: { EN: 'ING', SP: 'ESP' } });

    fixture = TestBed.createComponent(LanguageSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render labels for the active language', () => {
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll(
      '.language-button',
    ) as NodeListOf<HTMLButtonElement>;
    const labels = Array.from(buttons, (button) => button.textContent?.trim());

    expect(labels).toEqual(['EN', 'SP']);
  });

  it('should update labels when the active language changes', async () => {
    const translateService = TestBed.inject(TranslateService);
    fixture.detectChanges();

    translateService.use(LANGUAGE.SPANISH);
    await fixture.whenStable();
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll(
      '.language-button',
    ) as NodeListOf<HTMLButtonElement>;
    const labels = Array.from(buttons, (button) => button.textContent?.trim());

    expect(labels).toEqual(['ING', 'ESP']);
  });
});
