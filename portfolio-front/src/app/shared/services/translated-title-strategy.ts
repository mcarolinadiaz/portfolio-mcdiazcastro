import { Service, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SITE } from '../../core/constants/site';
import { PageMetadataService } from './page-metadata-service';

@Service()
export class TranslatedTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly translate = inject(TranslateService);
  private readonly pageMetadata = inject(PageMetadataService);
  private titleKey: string | undefined;
  private path = '/';

  constructor() {
    super();
    this.translate.onLangChange.subscribe(() => this.applyTitle());
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    this.titleKey = this.buildTitle(snapshot);
    this.path = snapshot.url;
    this.applyTitle();
  }

  private applyTitle(): void {
    const translatedSection = this.titleKey ? this.translate.instant(this.titleKey) : undefined;
    const title = translatedSection ? `${SITE.name} | ${translatedSection}` : SITE.name;
    this.title.setTitle(title);
    this.pageMetadata.update(title, this.path);
  }
}
