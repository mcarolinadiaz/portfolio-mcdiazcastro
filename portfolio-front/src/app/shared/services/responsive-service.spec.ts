import { TestBed } from '@angular/core/testing';
import { BreakpointObserver } from '@angular/cdk/layout';
import { of } from 'rxjs';

import { ResponsiveService } from './responsive-service';
import { BOOTSTRAP_BREAKPOINTS } from '../../core/constants/breakpoints';

describe('ResponsiveService', () => {
  let service: ResponsiveService;

  const matchingQueries = new Set<string>([
    BOOTSTRAP_BREAKPOINTS.isMobile,
    BOOTSTRAP_BREAKPOINTS.xs,
    BOOTSTRAP_BREAKPOINTS.sm
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: BreakpointObserver,
        useValue: {
          observe: (queries: string[]) => of({
            matches: matchingQueries.has(queries[0]),
            breakpoints: {}
          })
        }
      }]
    });
    service = TestBed.inject(ResponsiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose the matching breakpoint states', () => {
    expect(service.isMobile()).toBe(true);
    expect(service.isExtraSmall()).toBe(true);
    expect(service.isSmall()).toBe(true);
  });

  it('should expose false for non-matching breakpoint states', () => {
    expect(service.isTablet()).toBe(false);
    expect(service.isDesktop()).toBe(false);
    expect(service.isMedium()).toBe(false);
    expect(service.isLargeScreen()).toBe(false);
    expect(service.isExtraLargeScreen()).toBe(false);
  });
});
