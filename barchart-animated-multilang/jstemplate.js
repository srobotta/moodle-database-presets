document.addEventListener('DOMContentLoaded', () => {
  const currentLang = getCurrentLangForInstruments();
  document.querySelectorAll('.favorite-instrument .multilang').forEach((e) => {
    if (e.getAttribute('lang') !== currentLang) {
      e.remove();
    }
  });
  document.querySelectorAll('.translate-instrument').forEach((e) => {
    e.innerHTML = instrumentLabel(e.textContent.trim());
  });
});
// This must be defined globally, otherwise the code in the list view template
// could not access the function.
const getCurrentLangForInstruments = () => {
  const availableLanguages = ['de', 'en', 'fr'];
  let currentLang = M.cfg.language ?? 'de';
  if (!availableLanguages.includes(currentLang)) {
    currentLang = 'de';
  }
  return currentLang;
};
// The translator function, that translates the value to the label.
const instrumentLabel = (val) => {
  const labels = {
    violin: {
      de: 'Geige',
      en: 'Violin',
      fr: 'Violon'
    },
    guitar: {
      de: 'Gitarre',
      en: 'Guitar',
      fr: 'Guitare'
    },
    drums: {
      de: 'Trommel',
      en: 'Drums',
      fr: 'Tambour',
    },
    saxophone: {
      de: 'Saxofon',
      en: 'Saxophone',
      fr: 'Saxophone'
    },
    piano: {
      de: 'Klavier',
      en: 'Piano',
      fr: 'Piano'
    },
    radio: {
      de: 'Radio',
      en: 'Radio',
      fr: 'Radio'
    }
  };
  const currentLang = getCurrentLangForInstruments();
  if (labels.hasOwnProperty(val)) {
    return labels[val][currentLang];
  }
  return val;
};