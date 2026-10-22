import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-list-group',
  imports: [],
  templateUrl: './list-group.html',
  styleUrl: './list-group.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListGroup {
  readonly listItems = input.required<string[]>();

  protected readonly lastItem = computed(() => this.listItems().at(-1));
}
