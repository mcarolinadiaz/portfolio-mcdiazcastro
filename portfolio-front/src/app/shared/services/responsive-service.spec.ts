import { TestBed } from '@angular/core/testing';
import { BreakpointObserver } from '@angular/cdk/layout';
import { of } from 'rxjs';

import { ResponsiveService } from './responsive-service';
import { BREAKPOINTS } from '../../core/constants/breakpoints';

describe('ResponsiveService', () => {
  function createService(matchingQueries: string[]): ResponsiveService {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: BreakpointObserver,
          useValue: {
            observe: (queries: string[]) =>
              of({ matches: matchingQueries.includes(queries[0]), breakpoints: {} }),
          },
        },
      ],
    });
    return TestBed.inject(ResponsiveService);
  }

  it('should report mobile when the mobile breakpoint matches', () => {
    expect(createService([BREAKPOINTS.isMobile]).isMobile()).toBe(true);
  });

  it('should report not mobile otherwise', () => {
    expect(createService([]).isMobile()).toBe(false);
  });
});
