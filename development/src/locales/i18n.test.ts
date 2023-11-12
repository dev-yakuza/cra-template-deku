import i18n, { defaultLanguage, languages } from './i18n'
import en from './translation/en.json'
import ja from './translation/ja.json'
import ko from './translation/ko.json'

describe('i18n', () => {
  test('defaultLanguage', () => {
    expect(defaultLanguage).toBe('en')
  })

  test('languages', () => {
    expect(languages).toEqual([
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
    ])
  })

  test('i18n configuration', () => {
    const options = i18n.options
    expect(options.resources).toEqual({
      en: {
        translation: en,
      },
      ja: {
        translation: ja,
      },
      ko: {
        translation: ko,
      },
    })
    expect(options.lng).toBe('en')
    expect(options.fallbackLng).toEqual(['en'])
    expect(options.interpolation?.escapeValue).toBe(false)
  })
})
