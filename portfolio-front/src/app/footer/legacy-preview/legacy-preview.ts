import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LEGACY_SITE } from '../../core/constants/legacy-site';
import { Icon } from '../../shared/icon/icon';
import { ResponsiveService } from '../../shared/services/responsive-service';

/** Footer button that opens a card with a screenshot linking to version 1 of the site. */
@Component({
  selector: 'app-legacy-preview',
  imports: [Icon, TranslatePipe],
  templateUrl: './legacy-preview.html',
  styleUrl: './legacy-preview.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'closeAndFocusToggle()',
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class LegacyPreview {
  protected readonly responsiveService = inject(ResponsiveService);
  protected readonly legacySite = LEGACY_SITE;
  protected readonly previewId = 'legacy-preview';
  readonly isOpen = signal(false);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly toggleButton = viewChild.required<ElementRef<HTMLButtonElement>>('previewToggle');

  toggle(): void {
    this.isOpen.update((isOpen) => !isOpen);
  }

  close(): void {
    this.isOpen.set(false);
  }

  closeAndFocusToggle(): void {
    if (!this.isOpen()) {
      return;
    }
    this.close();
    this.toggleButton().nativeElement.focus();
  }

  protected onDocumentClick(event: MouseEvent): void {
    if (this.isOpen() && !this.host.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }
}
