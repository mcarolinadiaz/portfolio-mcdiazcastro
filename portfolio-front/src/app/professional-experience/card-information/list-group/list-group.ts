import { Component, input } from '@angular/core';

@Component({
  selector: 'app-list-group',
  imports: [],
  templateUrl: './list-group.html',
  styleUrl: './list-group.scss',
})
export class ListGroup {
  listItems = input.required<string[]>();
}
