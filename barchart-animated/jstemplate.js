document.addEventListener('DOMContentLoaded', () => {
  const languages = ['de', 'en', 'fr'];
  let currentLang = M.cfg.language ?? 'de';
  if (!languages.includes(currentLang)) {
    currentLang = 'de';
  }
  document.querySelectorAll('.favorite-instrument .multilang').forEach((e) => {
    if (e.getAttribute('lang') !== currentLang) {
      e.remove();
    }
  });
});