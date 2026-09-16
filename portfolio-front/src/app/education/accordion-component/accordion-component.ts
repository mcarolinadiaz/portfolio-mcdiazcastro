import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-accordion-component',
  styleUrl: './accordion-component.scss',
  templateUrl: './accordion-component.html',
})
export class AccordionComponent {
  idItem = input.required<string>();
  nameItem = input<string>();
}
