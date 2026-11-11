import { computed, inject, Service } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { DateRange, formatDateRange } from '../utils/date-range';
import { LANGUAGE_LOCALE, LanguageService } from './language-service';

const PRESENT_KEY = 'COMMON.PRESENT';

@Service()
export class DateRangeFormatter {
  private readonly languageService = inject(LanguageService);
  private readonly presentLabel = toSignal(inject(TranslateService).stream(PRESENT_KEY), {
    initialValue: PRESENT_KEY,
  });

  readonly format = computed(() => {
    const locale = LANGUAGE_LOCALE[this.languageService.activeLanguage()];
    const present = this.presentLabel();
    return (range: DateRange): string => formatDateRange(range, locale, present);
  });
}
