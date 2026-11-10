/**
 * Downloadable CV. The PDF is not in the repository yet: once it is added under
 * `public/` (e.g. `public/cv/...pdf`), set `path` to its URL relative to the site
 * root (e.g. 'cv/Resume-CarolinaDiaz.pdf'). The "Download CV" button stays hidden
 * while `path` is null.
 */
export const CURRICULUM: { readonly path: string | null; readonly fileName: string } = {
  path: null,
  fileName: 'Resume-CarolinaDiaz.pdf',
};
