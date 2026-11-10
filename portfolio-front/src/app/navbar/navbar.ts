import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DropdownMenu } from './dropdown-menu/dropdown-menu';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, DropdownMenu],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  protected readonly title: string = 'Carolina Díaz';
  protected readonly brandInitial: string = 'C';
}
