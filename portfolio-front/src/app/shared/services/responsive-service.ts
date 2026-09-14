import { BreakpointObserver } from '@angular/cdk/layout';
import { inject, Service } from '@angular/core';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { BOOTSTRAP_BREAKPOINTS } from '../../core/constants/breakpoints';

@Service()
export class ResponsiveService {
    private breakpointObserver = inject(BreakpointObserver);

    readonly isMobile = this.createSignal(BOOTSTRAP_BREAKPOINTS.isMobile);
    readonly isTablet = this.createSignal(BOOTSTRAP_BREAKPOINTS.isTablet);
    readonly isDesktop = this.createSignal(BOOTSTRAP_BREAKPOINTS.isDesktop);

    readonly isExtraSmall = this.createSignal(BOOTSTRAP_BREAKPOINTS.xs);
    readonly isSmall = this.createSignal(BOOTSTRAP_BREAKPOINTS.sm);
    readonly isMedium = this.createSignal(BOOTSTRAP_BREAKPOINTS.md);
    readonly isLargeScreen = this.createSignal(BOOTSTRAP_BREAKPOINTS.lg);
    readonly isExtraLargeScreen = this.createSignal(BOOTSTRAP_BREAKPOINTS.xl);

    private createSignal(query: string) {
        const stream$ = this.breakpointObserver
        .observe([query])
        .pipe(map(result => result.matches));

        return toSignal(stream$, { initialValue: false });
    }
}

