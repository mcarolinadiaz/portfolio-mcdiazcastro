import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-center-content',
  imports: [],
  templateUrl: './center-content.html',
  styleUrl: './center-content.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CenterContent {
  readonly image = input<string>();
  readonly imageName = input<string>();

  protected readonly hasImage = computed(() => !!this.image());
}
