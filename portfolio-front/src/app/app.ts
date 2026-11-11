import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
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
  private readonly document = inject(DOCUMENT);
  private readonly pageContainer = viewChild.required<ElementRef<HTMLElement>>('pageContainer');
  private isFirstNavigation = true;

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        // The router's scroll restoration only handles the window. The page scrolls
        // inside <main> on regular screens and in the whole document on short
        // screens (see app.scss), so reset both on every navigation.
        this.pageContainer().nativeElement.scrollTop = PAGE_TOP;
        if (this.document.scrollingElement) {
          this.document.scrollingElement.scrollTop = PAGE_TOP;
        }

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
