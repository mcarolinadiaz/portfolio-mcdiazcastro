import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { inject, Service, signal } from '@angular/core';

@Service()
export class UrlSanitizerService {
    private readonly sanitizer = inject(DomSanitizer);

    readonly angularSite = signal<SafeUrl>(this.sanitizeUrl('https://angular.dev/'));
    readonly bootstrapSite = signal<SafeUrl>(this.sanitizeUrl('https://getbootstrap.com/'));
    readonly vscSite = signal<SafeUrl>(this.sanitizeUrl('https://code.visualstudio.com/'));
    readonly vitestSite = signal<SafeUrl>(this.sanitizeUrl('https://vitest.dev/'));
    readonly vercelSite = signal<SafeUrl>(this.sanitizeUrl('https://vercel.com/'));
    readonly copilotSite = signal<SafeUrl>(this.sanitizeUrl('https://github.com/copilot'));

    sanitizeUrl(url: string): SafeUrl {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }
}