import { Component, inject, OnInit, signal } from '@angular/core';
import { DropdownMenu } from './dropdown-menu/dropdown-menu';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ResponsiveService } from '../services/responsive-service';

@Component({
  selector: 'app-navbar',
  imports: [ DropdownMenu ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  title: string = 'Carolina Díaz';
  mobileTitle: string = 'CD';
  sectionTitle = signal('');

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  protected responsiveService = inject(ResponsiveService);

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateSectionTitle();
      });
  }

  private updateSectionTitle(): void {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const title = route.snapshot.title?.split('|')[1] ?? '';
    this.sectionTitle.set(title);
  }
}
