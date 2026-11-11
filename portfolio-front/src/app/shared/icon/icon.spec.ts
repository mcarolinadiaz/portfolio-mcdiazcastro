import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Icon } from './icon';

describe('Icon', () => {
  let fixture: ComponentFixture<Icon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Icon],
    }).compileComponents();

    fixture = TestBed.createComponent(Icon);
    fixture.componentRef.setInput('name', 'email');
    await fixture.whenStable();
  });

  it('should render a decorative svg with the icon paths', () => {
    const svg = fixture.nativeElement.querySelector('svg') as SVGElement;

    expect(svg.getAttribute('aria-hidden')).toBe('true');
    expect(svg.querySelectorAll('path').length).toBe(2);
  });

  it('should apply the requested size', async () => {
    fixture.componentRef.setInput('size', 32);
    await fixture.whenStable();

    const svg = fixture.nativeElement.querySelector('svg') as SVGElement;
    expect(svg.getAttribute('width')).toBe('32');
    expect(svg.getAttribute('height')).toBe('32');
  });
});
