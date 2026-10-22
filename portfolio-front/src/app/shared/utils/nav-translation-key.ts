const DEFAULT_NAV_SEGMENT = 'ABOUT';

export function getNavTranslationKey(path: string | null | undefined): string {
  const segment = path ? path.replaceAll('-', '_').toUpperCase() : DEFAULT_NAV_SEGMENT;
  return `NAV.${segment}`;
}
