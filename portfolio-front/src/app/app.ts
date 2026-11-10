import { ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';

const PAGE_TOP = 0;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly router = inject(Router);
  private readonly pageContainer = viewChild.required<ElementRef<HTMLElement>>('pageContainer');

  constructor() {
    // The page area is the scroll container (not the window), so the router's
    // scroll restoration does not apply: reset it on every navigation.
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.pageContainer().nativeElement.scrollTop = PAGE_TOP;
      });
  }
}
