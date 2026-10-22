import { getNavTranslationKey } from './nav-translation-key';

describe('getNavTranslationKey', () => {
  it('should map the empty root path to the About key', () => {
    expect(getNavTranslationKey('')).toBe('NAV.ABOUT');
  });

  it('should map undefined or null paths to the About key', () => {
    expect(getNavTranslationKey(undefined)).toBe('NAV.ABOUT');
    expect(getNavTranslationKey(null)).toBe('NAV.ABOUT');
  });

  it('should upper-case a single-word path', () => {
    expect(getNavTranslationKey('education')).toBe('NAV.EDUCATION');
  });

  it('should replace dashes with underscores for multi-word paths', () => {
    expect(getNavTranslationKey('professional-experience')).toBe(
      'NAV.PROFESSIONAL_EXPERIENCE',
    );
    expect(getNavTranslationKey('keep-in-touch')).toBe('NAV.KEEP_IN_TOUCH');
  });
});
