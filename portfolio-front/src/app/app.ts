import { ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';

const PAGE_TOP = 0;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly router = inject(Router);
  private readonly pageContainer = viewChild.required<ElementRef<HTMLElement>>('pageContainer');
  private isFirstNavigation = true;

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        // The page area is the scroll container (not the window), so the router's
        // scroll restoration does not apply: reset it on every navigation.
        this.pageContainer().nativeElement.scrollTop = PAGE_TOP;

        // After an in-app navigation, move focus to the new page so screen readers
        // announce it and keyboard users continue from its content.
        if (this.isFirstNavigation) {
          this.isFirstNavigation = false;
        } else {
          this.focusMainContent();
        }
      });
  }

  focusMainContent(): void {
    this.pageContainer().nativeElement.focus({ preventScroll: true });
  }
}
