import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      lv: {
        translation: {
          "Write description": "Raksti aprakstu",
          "Description": "Apraksts",
          "Add text": "Pievieno tekstu",
          "mammals": "zīdītāji"
        }
      },
      en: {
        translation: {
          "Write description": "Write description",
          "Description": "Description",
          "Add text": "Add text",
          "mammals": "mammals"
        }
      }
    },
    lng: "lv",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;