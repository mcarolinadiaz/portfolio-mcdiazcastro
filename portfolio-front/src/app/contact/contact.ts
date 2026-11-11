import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SocialLinks } from '../shared/social-links/social-links';

@Component({
  selector: 'app-contact',
  imports: [SocialLinks, TranslatePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {}
