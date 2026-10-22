import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import {
  LANGUAGE,
  LanguageService,
  SupportedLanguage,
} from '../../shared/services/language-service';

@Component({
  selector: 'app-language-selector',
  imports: [TranslatePipe],
  templateUrl: './language-selector.html',
  styleUrl: './language-selector.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSelector {
  protected readonly languageService = inject(LanguageService);
  protected readonly language = LANGUAGE;

  protected setLanguage(language: SupportedLanguage): void {
    this.languageService.setLanguage(language);
  }
}
