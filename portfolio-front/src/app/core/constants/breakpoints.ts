export const BOOTSTRAP_BREAKPOINTS = {
  xs: '(max-width: 575.98px)',
  sm: '(min-width: 576px) and (max-width: 767.98px)',
  md: '(min-width: 768px) and (max-width: 991.98px)',
  lg: '(min-width: 992px) and (max-width: 1199.98px)',
  xl: '(min-width: 1200px) and (max-width: 1399.98px)',
  xxl: '(min-width: 1400px)',
  
  isMobile: '(max-width: 767.98px)',
  isTablet: '(min-width: 768px) and (max-width: 991.98px)',
  isDesktop: '(min-width: 992px)'
} as const;