import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** Stroke icons (24x24 grid) that inherit the text color via `currentColor`. */
const ICON_PATHS = {
  linkedin: [
    'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z',
    'M2 9h4v12H2z',
    'M2 4a2 2 0 1 0 4 0a2 2 0 1 0-4 0',
  ],
  github: [
    'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22',
  ],
  email: [
    'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
    'M22 6l-10 7L2 6',
  ],
  history: ['M3 12a9 9 0 1 0 3-6.7L3 8', 'M3 3v5h5', 'M12 7v5l3 2'],
  external: [
    'M14 4h6v6',
    'M20 4l-9 9',
    'M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5',
  ],
  'arrow-right': ['M5 12h14', 'M13 6l6 6-6 6'],
  'arrow-up-right': ['M7 17L17 7', 'M9 7h8v8'],
  download: ['M12 3v12', 'M7 10l5 5 5-5', 'M5 21h14'],
  close: ['M6 6l12 12M18 6L6 18'],
  menu: ['M4 7h16M4 12h16M4 17h16'],
} as const satisfies Record<string, readonly string[]>;

export type IconName = keyof typeof ICON_PATHS;

const DEFAULT_ICON_SIZE = 20;

@Component({
  selector: 'app-icon',
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input<number>(DEFAULT_ICON_SIZE);

  protected readonly paths = computed(() => ICON_PATHS[this.name()]);
}
