import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-center-content',
  imports: [CommonModule],
  templateUrl: './center-content.html',
  styleUrl: './center-content.scss',
})
export class CenterContent {
  image = input<string>();
  imageName = input<string>();
  
  get isImageLoading() {
    return this.image() ? signal(true) : signal(false);
  }

  
}
