import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  name: string = 'María Carolina Díaz Castro';
  alias: string = 'Caro';
  degree: string = 'Ingeniera de sistemas';
  about: string = 'I\'m a software engineer, passionate about technology and innovation. I love to learn new things and share my knowledge with others. I\'m always looking for new challenges and opportunities to grow professionally.';
}
