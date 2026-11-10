// Dates in the portfolio data are created from 'YYYY-MM-DD' strings (UTC midnight),
// so they are always formatted in UTC to avoid shifting to the previous month.
const MONTH_YEAR_OPTIONS: Intl.DateTimeFormatOptions = {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
};
const MONTH_OPTIONS: Intl.DateTimeFormatOptions = { month: 'short', timeZone: 'UTC' };
const RANGE_SEPARATOR = ' – ';
const ABBREVIATION_DOT = /\./g;

export interface DateRange {
  readonly startDate: Date;
  readonly endDate: Date | null;
}

// Some locales lowercase or dot-abbreviate months ("sept." in es): normalize to "Sept".
function normalize(text: string): string {
  const withoutDots = text.replace(ABBREVIATION_DOT, '');
  return withoutDots.charAt(0).toLocaleUpperCase() + withoutDots.slice(1);
}

export function formatMonthYear(date: Date, locale: string): string {
  return normalize(new Intl.DateTimeFormat(locale, MONTH_YEAR_OPTIONS).format(date));
}

/**
 * "Sep 2024 – May 2026", "Jan – Sep 2024" (same year) or "Aug 2026 – Present"
 * (open-ended, `endDate` null).
 */
export function formatDateRange(range: DateRange, locale: string, presentLabel: string): string {
  const { startDate, endDate } = range;
  if (endDate === null) {
    return `${formatMonthYear(startDate, locale)}${RANGE_SEPARATOR}${presentLabel}`;
  }
  const isSameYear = startDate.getUTCFullYear() === endDate.getUTCFullYear();
  const start = isSameYear
    ? normalize(new Intl.DateTimeFormat(locale, MONTH_OPTIONS).format(startDate))
    : formatMonthYear(startDate, locale);
  return `${start}${RANGE_SEPARATOR}${formatMonthYear(endDate, locale)}`;
}

/** Smallest range covering every given range (open-ended if any of them is). */
export function spanDateRanges(ranges: readonly DateRange[]): DateRange {
  const startDate = new Date(Math.min(...ranges.map((range) => range.startDate.getTime())));
  const endDates = ranges.map((range) => range.endDate);
  const endDate = endDates.includes(null)
    ? null
    : new Date(Math.max(...endDates.map((date) => (date as Date).getTime())));
  return { startDate, endDate };
}
