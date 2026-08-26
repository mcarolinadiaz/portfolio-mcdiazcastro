import { Component, inject, OnInit } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { ResponsiveService } from '../../services/responsive-service';

@Component({
  selector: 'app-dropdown-menu',
  imports: [RouterLink],
  templateUrl: './dropdown-menu.html',
  styleUrl: './dropdown-menu.scss',
})
export class DropdownMenu implements OnInit {
  private router = inject(Router);
  protected responsiveService = inject(ResponsiveService);
  
  appRoutes: Route[] = [];

  ngOnInit(): void {
    this.appRoutes = this.router.config.at(0)?.children?.filter((child: any) => child.path !== undefined && child.title !== undefined)
    .map((child: any) => 
    {
      return {
        path: child.path,
        title: String(child.title)?.split('|')[0] ?? '', 
      };
    }) ?? [];
  }


}
