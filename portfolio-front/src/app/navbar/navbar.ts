import { Component, inject, OnInit, signal } from '@angular/core';
import { DropdownMenu } from './dropdown-menu/dropdown-menu';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [ DropdownMenu ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  title: string = 'MCDíazCastro';
  sectionTitle = signal('');

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateSectionTitle();
      });
  }

  private updateSectionTitle(): void {
    let route = this.activatedRoute;
    while (route.firstChild) {
      console.log('Route:', route.firstChild);
      route = route.firstChild;
    }
    const title = route.snapshot.title?.split('|')[0] ?? '';
    this.sectionTitle.set(title);
  }
}
