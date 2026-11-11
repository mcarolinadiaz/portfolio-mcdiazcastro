const LEGACY_SITE_URL = 'https://portfolio-carolinadiaz-v1.vercel.app/';

export const LEGACY_SITE = {
  url: LEGACY_SITE_URL,
  host: new URL(LEGACY_SITE_URL).host,
  badge: 'V1',
  screenshots: {
    desktop: { src: 'assets/legacy/v1-desktop.webp', width: 840, height: 525 },
    mobile: { src: 'assets/legacy/v1-mobile.webp', width: 390, height: 844 },
  },
} as const;
