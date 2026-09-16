import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

import { UrlSanitizerService } from './url-sanitizer-service';

describe('UrlSanitizerService', () => {
  let service: UrlSanitizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlSanitizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sanitize a URL', () => {
    const sanitizedUrl = service.sanitizeUrl('https://angular.dev/');

    expect(TestBed.inject(DomSanitizer).sanitize(4, sanitizedUrl)).toBe('https://angular.dev/');
  });
});