import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './translation/en.json'
import ja from './translation/ja.json'
import ko from './translation/ko.json'

const defaultLanguage = 'en'
const languages = [
  {
    title: 'English',
    value: 'en',
  },
  {
    title: '日本語',
    value: 'ja',
  },
  {
    title: '한국어',
    value: 'ko',
  },
]

const resources = {
  en: {
    translation: en,
  },
  ja: {
    translation: ja,
  },
  ko: {
    translation: ko,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage,
  fallbackLng: defaultLanguage,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
export { defaultLanguage, languages }
