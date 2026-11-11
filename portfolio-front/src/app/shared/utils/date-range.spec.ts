import { formatDateRange, formatMonthYear, spanDateRanges } from './date-range';
import { LANGUAGE, LANGUAGE_LOCALE } from '../services/language-service';

const EN = LANGUAGE_LOCALE[LANGUAGE.ENGLISH];
const ES = LANGUAGE_LOCALE[LANGUAGE.SPANISH];

describe('date-range utils', () => {
  it('should format month and year in each language, capitalized', () => {
    expect(formatMonthYear(new Date('2026-09-01'), EN)).toBe('Sep 2026');
    expect(formatMonthYear(new Date('2026-08-01'), ES)).toBe('Ago 2026');
  });

  it('should keep the month of UTC dates regardless of the local time zone', () => {
    expect(formatMonthYear(new Date('2024-01-01'), EN)).toBe('Jan 2024');
  });

  it('should render an open-ended range with the present label', () => {
    expect(
      formatDateRange({ startDate: new Date('2026-08-01'), endDate: null }, EN, 'Present'),
    ).toBe('Aug 2026 – Present');
  });

  it('should omit the start year when both dates are in the same year', () => {
    expect(
      formatDateRange(
        { startDate: new Date('2024-01-01'), endDate: new Date('2024-09-30') },
        EN,
        'Present',
      ),
    ).toBe('Jan – Sep 2024');
  });

  it('should show a single month when both dates are in the same month', () => {
    expect(
      formatDateRange(
        { startDate: new Date('2021-10-01'), endDate: new Date('2021-10-31') },
        ES,
        'Presente',
      ),
    ).toBe('Oct 2021');
  });

  it('should show both years for ranges across years', () => {
    expect(
      formatDateRange(
        { startDate: new Date('2024-09-01'), endDate: new Date('2026-05-31') },
        ES,
        'Presente',
      ),
    ).toBe('Sept 2024 – May 2026');
  });

  it('should span several ranges and stay open-ended if any of them is', () => {
    const span = spanDateRanges([
      { startDate: new Date('2024-10-01'), endDate: new Date('2026-05-31') },
      { startDate: new Date('2019-04-01'), endDate: new Date('2019-09-30') },
      { startDate: new Date('2026-08-01'), endDate: null },
    ]);

    expect(span.startDate.toISOString()).toBe('2019-04-01T00:00:00.000Z');
    expect(span.endDate).toBeNull();
  });
});
