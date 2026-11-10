import { computed, inject, Service } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { DateRange, formatDateRange } from '../utils/date-range';
import { LANGUAGE_LOCALE, LanguageService } from './language-service';

const PRESENT_KEY = 'COMMON.PRESENT';

/** Formats date ranges in the active language ("Sep 2024 – May 2026", "… – Present"). */
@Service()
export class DateRangeFormatter {
  private readonly languageService = inject(LanguageService);
  private readonly presentLabel = toSignal(inject(TranslateService).stream(PRESENT_KEY), {
    initialValue: PRESENT_KEY,
  });

  /**
   * Formatting function for the current language. Read it inside `computed()` so
   * the result updates when the language changes.
   */
  readonly format = computed(() => {
    const locale = LANGUAGE_LOCALE[this.languageService.activeLanguage()];
    const present = this.presentLabel();
    return (range: DateRange): string => formatDateRange(range, locale, present);
  });
}
