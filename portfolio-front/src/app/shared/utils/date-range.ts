import { ProfessionalExperience } from '../models/professional-experience';

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

function normalize(text: string): string {
  const withoutDots = text.replace(ABBREVIATION_DOT, '');
  return withoutDots.charAt(0).toLocaleUpperCase() + withoutDots.slice(1);
}

export function formatMonthYear(date: Date, locale: string): string {
  return normalize(new Intl.DateTimeFormat(locale, MONTH_YEAR_OPTIONS).format(date));
}

export function formatDateRange(range: DateRange, locale: string, presentLabel: string): string {
  const { startDate, endDate } = range;
  if (endDate === null) {
    return `${formatMonthYear(startDate, locale)}${RANGE_SEPARATOR}${presentLabel}`;
  }
  const isSameYear = startDate.getUTCFullYear() === endDate.getUTCFullYear();
  if (isSameYear && startDate.getUTCMonth() === endDate.getUTCMonth()) {
    return formatMonthYear(endDate, locale);
  }
  const start = isSameYear
    ? normalize(new Intl.DateTimeFormat(locale, MONTH_OPTIONS).format(startDate))
    : formatMonthYear(startDate, locale);
  return `${start}${RANGE_SEPARATOR}${formatMonthYear(endDate, locale)}`;
}

export function getExperienceDateRanges(experience: ProfessionalExperience): DateRange[] {
  if (experience.dates?.length) {
    return experience.dates;
  }
  return experience.startDate
    ? [{ startDate: experience.startDate, endDate: experience.endDate ?? null }]
    : [];
}

export function spanDateRanges(ranges: readonly DateRange[]): DateRange {
  const startDate = new Date(Math.min(...ranges.map((range) => range.startDate.getTime())));
  const endDates = ranges.map((range) => range.endDate);
  const endDate = endDates.includes(null)
    ? null
    : new Date(Math.max(...endDates.map((date) => (date as Date).getTime())));
  return { startDate, endDate };
}
