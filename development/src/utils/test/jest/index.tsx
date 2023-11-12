import { render } from '@testing-library/react'
import i18n from 'locales/i18n'
import { I18nextProvider } from 'react-i18next'

import type { RenderOptions } from '@testing-library/react'

const AllTheProviders = ({
  children,
}: {
  readonly children: React.ReactElement
}) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }
