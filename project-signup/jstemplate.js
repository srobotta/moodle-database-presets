const dbPresetLangStr = {
  "en": {
    "app_1_title": "1st applicant",
    "app_2_title": "2nd applicant",
    "app_3_title": "3rd applicant",
    "app_4_title": "4th applicant",
    "app_5_title": "5th applicant",
    "supervisor": "Supervisor",
    "action": "Action",
    "topic": "Topic"
  },
  "de": {
    "app_1_title": "1. Bewerber",
    "app_2_title": "2. Bewerber",
    "app_3_title": "3. Bewerber",
    "app_4_title": "4. Bewerber",
    "app_5_title": "5. Bewerber",
    "date": "Datum",
    "supervisor": "Betreuer",
    "supervisor_email": "E-Mail Betreuer",
    "action": "Aktionen",
    "topic": "Thema",
    "details": "Beschreibung",
    "firstname": "Vorname",
    "surname": "Familienname",
    "email": "E-Mail",
    "applicants": "Bewerber"
  },
}
document.addEventListener('DOMContentLoaded', () => {
  let lang = navigator.language || navigator.userLanguage;
  lang = 'xx'; // Remove this line, if you prefer to use the browser language.
  if (!dbPresetLangStr.hasOwnProperty(lang)) {
    lang = document.head.parentElement.getAttribute('lang') || document.head.parentElement.getAttribute('lang');
    if (!dbPresetLangStr.hasOwnProperty(lang)) {
      return;
    }
  }
  document.querySelectorAll('[data-lang]').forEach((el) => {
    const key = el.getAttribute('data-lang');
    if (dbPresetLangStr[lang].hasOwnProperty(key)) {
      el.innerHTML = dbPresetLangStr[lang][key];
    }
  });
});