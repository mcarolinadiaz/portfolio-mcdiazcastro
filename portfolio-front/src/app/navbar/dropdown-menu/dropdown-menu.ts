import { Component, inject, OnInit } from '@angular/core';
import { Route, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ResponsiveService } from '../../shared/services/responsive-service';

@Component({
  selector: 'app-dropdown-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './dropdown-menu.html',
  styleUrl: './dropdown-menu.scss',
})
export class DropdownMenu {
  private router = inject(Router);
  protected responsiveService = inject(ResponsiveService);
  
  appRoutes: Route[] = [];

  constructor() {
    this.appRoutes = this.router.config.at(0)?.children?.filter((child: any) => child.path !== undefined && child.title !== undefined)
    .map((child: any) => 
    {
      return {
        path: child.path,
        title: String(child.title)?.split('|')[1] ?? '', 
      };
    }) ?? [];
  }


}
