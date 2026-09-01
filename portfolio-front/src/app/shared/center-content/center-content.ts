import { Component, input } from '@angular/core';

@Component({
  selector: 'app-center-content',
  imports: [],
  templateUrl: './center-content.html',
  styleUrl: './center-content.scss',
})
export class CenterContent {
  image = input.required<string>();
  imageName = input.required<string>();
}
