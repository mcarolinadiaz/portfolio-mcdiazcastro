import { Pipe, PipeTransform } from '@angular/core';

const BLANK_LINE = /\n\s*\n/;

@Pipe({ name: 'paragraphs' })
export class ParagraphsPipe implements PipeTransform {
  transform(text: string | null | undefined): string[] {
    if (!text) {
      return [];
    }
    return text
      .split(BLANK_LINE)
      .map((paragraph) => paragraph.trim())
      .filter((paragraph) => paragraph.length > 0);
  }
}
