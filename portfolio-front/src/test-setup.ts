// Runs before every spec file (angular.json > test > options > setupFiles).
// LanguageService persists the chosen language in localStorage, which jsdom
// shares between tests: clear it so every test starts in the default language.
beforeEach(() => {
  localStorage.clear();
});
