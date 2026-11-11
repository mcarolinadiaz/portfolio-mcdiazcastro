import { BreakpointObserver } from '@angular/cdk/layout';
import { inject, Service } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { BREAKPOINTS } from '../../core/constants/breakpoints';

@Service()
export class ResponsiveService {
  private readonly breakpointObserver = inject(BreakpointObserver);

  readonly isMobile = this.createSignal(BREAKPOINTS.isMobile);

  private createSignal(query: string) {
    const matches$ = this.breakpointObserver.observe([query]).pipe(map((result) => result.matches));

    return toSignal(matches$, { initialValue: false });
  }
}
