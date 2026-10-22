import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-accordion-component',
  styleUrl: './accordion-component.scss',
  templateUrl: './accordion-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent {
  readonly idItem = input.required<string>();
  readonly nameItem = input<string>();
}
