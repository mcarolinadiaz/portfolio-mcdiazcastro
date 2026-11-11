import { ParagraphsPipe } from './paragraphs-pipe';

describe('ParagraphsPipe', () => {
  const pipe = new ParagraphsPipe();

  it('should split a text on blank lines', () => {
    expect(pipe.transform('First.\n\nSecond.\n \nThird.')).toEqual(['First.', 'Second.', 'Third.']);
  });

  it('should keep single line breaks inside a paragraph', () => {
    expect(pipe.transform('Line one\nline two')).toEqual(['Line one\nline two']);
  });

  it('should return an empty list for empty values', () => {
    expect(pipe.transform('')).toEqual([]);
    expect(pipe.transform(undefined)).toEqual([]);
  });
});
