import React from 'react'

import type { Preview } from '@storybook/react'

import { ThemeProvider } from '@mui/material'
import { theme } from '../src/utils/theme'
import { withRouter } from 'storybook-addon-react-router-v6'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'locales/i18n'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'fullscreen',
  },
}
export default preview

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

export const decorators = [
  (Story) => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    </QueryClientProvider>
  ),
  withRouter,
]
