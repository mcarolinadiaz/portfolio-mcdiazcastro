import { Service, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

const BRAND_NAME = 'Carolina Díaz';

@Service()
export class TranslatedTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly translate = inject(TranslateService);
  private titleKey: string | undefined;

  constructor() {
    super();
    this.translate.onLangChange.subscribe(() => this.applyTitle());
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    this.titleKey = this.buildTitle(snapshot);
    this.applyTitle();
  }

  private applyTitle(): void {
    const translatedSection = this.titleKey ? this.translate.instant(this.titleKey) : undefined;
    this.title.setTitle(translatedSection ? `${BRAND_NAME} | ${translatedSection}` : BRAND_NAME);
  }
}
